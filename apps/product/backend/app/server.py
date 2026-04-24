"""ChatKitServer subclass for the Paper Q&A Agent."""

import uuid
from collections.abc import AsyncIterator
from datetime import datetime, timezone
from typing import Any

from agents import Runner
from chatkit.agents import AgentContext, ThreadItemConverter, stream_agent_response
from chatkit.server import ChatKitServer
from chatkit.types import (
    GeneratedImage,
    GeneratedImageItem,
    ThreadItemAddedEvent,
    ThreadItemDoneEvent,
    ThreadMetadata,
    ThreadStreamEvent,
    UserMessageItem,
)

from .agent import paper_agent
from .simulation.figures import pending_images
from .store import MemoryStore


class PaperChatKitServer(ChatKitServer[dict[str, Any]]):
    def __init__(self, store: MemoryStore) -> None:
        super().__init__(store=store)
        self._converter = ThreadItemConverter()

    async def respond(
        self,
        thread: ThreadMetadata,
        input_user_message: UserMessageItem | None,
        context: dict[str, Any],
    ) -> AsyncIterator[ThreadStreamEvent]:
        agent_context = AgentContext(
            thread=thread,
            store=self.store,
            request_context=context,
        )

        items_page = await self.store.load_thread_items(
            thread.id, after=None, limit=100, order="asc", context=context,
        )
        input_items = await self._converter.to_agent_input(items_page.data)

        # Clear any pending images from previous requests
        pending_images.clear()

        result = Runner.run_streamed(paper_agent, input=input_items, context=agent_context, max_turns=25)

        async for event in stream_agent_response(agent_context, result):
            yield event

        # After the agent stream completes, inject any generated images
        for data_uri in pending_images:
            now = datetime.now(timezone.utc)
            item_id = str(uuid.uuid4())
            image = GeneratedImage(id=item_id, url=data_uri)
            image_item = GeneratedImageItem(
                id=item_id,
                thread_id=thread.id,
                created_at=now,
                image=image,
            )
            await self.store.add_thread_item(thread.id, image_item, context)
            yield ThreadItemAddedEvent(item=image_item)
            yield ThreadItemDoneEvent(item=image_item)

        pending_images.clear()
