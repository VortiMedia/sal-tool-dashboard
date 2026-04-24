import { Badge, PageHeader } from "@/components/ui";
import { uploads } from "@/lib/demo-data";

export default function UploadPage() {
  const steps = ["Upload", "Parse", "Extract", "Validate", "Score", "Complete"];
  return <>
    <PageHeader eyebrow="Upload" title="Ingestion pipeline"><Badge tone="warn">Mock pipeline · local-first</Badge></PageHeader>
    <section className="drop"><b>Drop policy, medical, or LE files</b><p>PDF, XLSX, CSV, DOCX up to 50 MB. PII strip/anonymization gates run before any inference step.</p><div className="chips" style={{justifyContent:"center"}}><span className="chip">Policy docs</span><span className="chip">Medical records</span><span className="chip">LE reports</span></div></section>
    <section className="card" style={{marginTop:16}}><div className="card-head"><h2>Processing pipeline</h2><Badge>policy_packet_POL-010.pdf · 82%</Badge></div><div className="pipeline">{steps.map((s,i)=><div key={s} className={`step ${i < 4 ? "done" : ""}`}>{i+1}. {s}</div>)}</div><div className="progress" style={{marginTop:16}}><i style={{width:"82%"}} /></div></section>
    <section className="card" style={{marginTop:16}}><div className="card-head"><h2>Recent uploads</h2><Badge>No real PII</Badge></div><div className="upload-list">{uploads.map((u)=><div className="upload-row" key={u.file}><b>{u.file}</b><span>{u.type}</span><span>{u.status} · {u.progress}%</span><Badge tone={u.issues ? "warn" : "good"}>{u.issues} issues</Badge></div>)}</div></section>
  </>;
}
