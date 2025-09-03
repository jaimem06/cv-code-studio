export function toMarkdown(data) {
  const md = [];
  md.push(`# ${data.info.name || "Your Name"}`);
  md.push(`**${data.info.title || "Software Engineer"}**`);
  md.push(`${data.info.location || "City"} · ${data.info.email} · ${data.info.phone}`);
  md.push("");
  md.push(`> ${data.summary.filter(Boolean).join("\n> ")}`);
  md.push("");
  md.push("## Skills");
  if (data.languages.length) md.push(`**Languages:** ${data.languages.join(", ")}`);
  if (data.tools.length) md.push(`**Tools/Frameworks:** ${data.tools.join(", ")}`);
  if (data.platforms.length) md.push(`**Platforms:** ${data.platforms.join(", ")}`);
  if (data.spoken.length) md.push(`**Spoken:** ${data.spoken.join(", ")}`);
  md.push("");
  md.push("## Education");
  data.education.forEach((e) =>
    md.push(`- **${e.institution}**, ${e.level} in ${e.field} (${e.date})`)
  );
  md.push("");
  md.push("## Experience");
  data.experiences.forEach((x) => {
    md.push(`### ${x.role} — ${x.company} (${x.start}–${x.end || "Present"})`);
    x.bullets.forEach((b) => md.push(`- ${b}`));
  });
  if (data.projects?.length) {
    md.push("");
    md.push("## Projects");
    data.projects.forEach((p) => {
      md.push(`- **${p.name}** — ${p.summary}${p.link ? ` ([link](${p.link}))` : ""}`);
      if (p.stack?.length) md.push(`  - Stack: ${p.stack.join(", ")}`);
    });
  }
  if (data.about) {
    md.push("");
    md.push("## About me");
    md.push(data.about);
  }
  return md.join("\n");
}
