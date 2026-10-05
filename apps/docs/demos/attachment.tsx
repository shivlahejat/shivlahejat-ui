import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";

export default function AttachmentDemo() {
  return (
    <>
      <AttachmentGroup role="group" aria-label="Attachments" tabIndex={0} style={{ maxWidth: "100%" }}>
        {[
          { name: "sales-dashboard.pdf", meta: "PDF · 2.4 MB", state: "done" as const },
          { name: "hero-photo.png", meta: "Uploading · 64%", state: "uploading" as const },
          { name: "notes.docx", meta: "Upload failed", state: "error" as const },
        ].map((f) => (
          <Attachment key={f.name} state={f.state} style={{ width: 240 }}>
            <AttachmentMedia>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6" />
              </svg>
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{f.name}</AttachmentTitle>
              <AttachmentDescription>{f.meta}</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label={`Remove ${f.name}`}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        ))}
      </AttachmentGroup>
    </>
  );
}
