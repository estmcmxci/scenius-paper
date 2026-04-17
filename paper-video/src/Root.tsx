import { Composition, Still } from "remotion";
import { PaperAnnouncement } from "./components/PaperAnnouncement";
import { OGImage } from "./components/OGImage";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PaperAnnouncement"
        component={PaperAnnouncement}
        durationInFrames={630}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="PaperAnnouncementStory"
        component={PaperAnnouncement}
        durationInFrames={630}
        fps={30}
        width={1080}
        height={1920}
      />
      <Still
        id="OGImage"
        component={OGImage}
        width={1200}
        height={630}
      />
    </>
  );
};
