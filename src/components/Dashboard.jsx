import Input from "./common/Input.jsx";
import TextArea from "./common/TextArea.jsx";
import TagInput from "./common/TagInput.jsx";
import EducationEditor from "./editors/EducationEditor.jsx";
import ExperienceEditor from "./editors/ExperienceEditor.jsx";
import ProjectsEditor from "./editors/ProjectsEditor.jsx";

export default function Dashboard({ data, setData, previewHeight, isLightMode }) {
  return (
    <div
      className="dashboard-container dashboard-sticky transition-theme"
      style={{
        height: previewHeight ? `${previewHeight}px` : undefined,
        overflowY: previewHeight ? "auto" : "visible",
      }}
    >
      <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-secondary)" }}>
        Dashboard
      </h3>

      {/* Dos columnas principales */}
      <div className="grid-form-cols gap-5">
        {/* Col A */}
        <div className="space-section">
          {/* Foto */}
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>
              Foto
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const url = URL.createObjectURL(f);
                  setData((d) => ({ ...d, photoUrl: url }));
                }}
                className="block w-full text-sm file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-sm file:font-medium file:btn-secondary"
                style={{ color: "var(--text-secondary)" }}
              />
              {data.photoUrl && (
                <img
                  src={data.photoUrl}
                  alt="preview"
                  className="w-10 h-10 rounded object-cover"
                  style={{ border: `1px solid var(--border-secondary)` }}
                />
              )}
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>
              Resumen (una línea por item)
            </label>
            <textarea
              rows={4}
              value={data.summary.join("\n")}
              onChange={(e) =>
                setData({ ...data, summary: e.target.value.split("\n") })
              }
              className="input-base"
            />
          </div>

          {/* Info */}
          <div className="grid-form-cols gap-3">
            <Input
              label="Nombre"
              value={data.info.name}
              onChange={(v) =>
                setData({ ...data, info: { ...data.info, name: v } })
              }
            />
            <Input
              label="Título/Posición"
              value={data.info.title}
              onChange={(v) =>
                setData({ ...data, info: { ...data.info, title: v } })
              }
            />
            <Input
              label="Email"
              value={data.info.email}
              onChange={(v) =>
                setData({ ...data, info: { ...data.info, email: v } })
              }
            />
            <Input
              label="Teléfono"
              value={data.info.phone}
              onChange={(v) =>
                setData({ ...data, info: { ...data.info, phone: v } })
              }
            />
            <Input
              label="Ubicación"
              value={data.info.location}
              onChange={(v) =>
                setData({ ...data, info: { ...data.info, location: v } })
              }
            />
            <Input
              label="Edad"
              value={data.info.age}
              onChange={(v) =>
                setData({ ...data, info: { ...data.info, age: v } })
              }
            />
            <div className="col-span-2">
              <label className="inline-flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <input
                  type="checkbox"
                  className="accent-emerald-500 rounded"
                  checked={data.info.vehicleLicense}
                  onChange={(e) =>
                    setData({
                      ...data,
                      info: { ...data.info, vehicleLicense: e.target.checked },
                    })
                  }
                />
                Posee licencia de conducir
              </label>
            </div>
          </div>

          <TagInput
            label="Plataformas"
            values={data.platforms}
            onAdd={(t) =>
              setData({ ...data, platforms: [...data.platforms, t] })
            }
            onRemove={(i) =>
              setData({
                ...data,
                platforms: data.platforms.filter((_, j) => j !== i),
              })
            }
          />
          
          <TagInput
            label="Lenguajes de programación"
            values={data.languages}
            onAdd={(t) =>
              setData({ ...data, languages: [...data.languages, t] })
            }
            onRemove={(i) =>
              setData({
                ...data,
                languages: data.languages.filter((_, j) => j !== i),
              })
            }
          />
        </div>

        {/* Col B */}
        <div className="space-section">
          <TagInput
            label="Herramientas / Frameworks"
            values={data.tools}
            onAdd={(t) => setData({ ...data, tools: [...data.tools, t] })}
            onRemove={(i) =>
              setData({ ...data, tools: data.tools.filter((_, j) => j !== i) })
            }
          />
          
          <TagInput
            label="Idiomas hablados"
            values={data.spoken}
            onAdd={(t) => setData({ ...data, spoken: [...data.spoken, t] })}
            onRemove={(i) =>
              setData({ ...data, spoken: data.spoken.filter((_, j) => j !== i) })
            }
          />
          
          <TagInput
            label="Perfil (cualidades)"
            values={data.profile}
            onAdd={(t) => setData({ ...data, profile: [...data.profile, t] })}
            onRemove={(i) =>
              setData({ ...data, profile: data.profile.filter((_, j) => j !== i) })
            }
          />
          
          <TextArea
            label="Acerca de mí"
            value={data.about}
            onChange={(v) => setData({ ...data, about: v })}
            rows={6}
          />
        </div>
      </div>

      <div className="h-4" />
      
      <EducationEditor
        education={data.education}
        setEducation={(xs) => setData({ ...data, education: xs })}
      />
      
      <div className="h-4" />
      
      <ExperienceEditor
        experiences={data.experiences}
        setExperiences={(xs) => setData({ ...data, experiences: xs })}
      />
      
      <div className="h-4" />
      
      <ProjectsEditor
        projects={data.projects}
        setProjects={(xs) => setData({ ...data, projects: xs })}
      />
    </div>
  );
}