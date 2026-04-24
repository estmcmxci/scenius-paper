import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { API_BASE } from '../lib/api';
import { useMediaQuery } from '../hooks/useMediaQuery';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export function PdfViewer() {
  const [numPages, setNumPages] = useState<number>(0);
  const isPhone = useMediaQuery('(max-width: 480px)');
  const isTablet = useMediaQuery('(max-width: 768px)');

  const pdfWidth = isPhone
    ? window.innerWidth - 24
    : isTablet
      ? window.innerWidth - 40
      : 700;

  return (
    <div className="pdf-viewer">
      <Document
        file={`${API_BASE}/api/paper/pdf`}
        onLoadSuccess={({ numPages: n }) => setNumPages(n)}
        loading={<div className="pdf-loading">Loading PDF...</div>}
        error={<div className="pdf-error">Failed to load PDF.</div>}
      >
        {Array.from({ length: numPages }, (_, i) => (
          <div key={i} className="pdf-page-wrapper">
            <Page
              pageNumber={i + 1}
              width={pdfWidth}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
            <div className="pdf-page-number">Page {i + 1}</div>
          </div>
        ))}
      </Document>
    </div>
  );
}
