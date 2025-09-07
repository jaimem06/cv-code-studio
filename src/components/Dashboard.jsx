import Input from "./common/Input.jsx";
import TextArea from "./common/TextArea.jsx";
import TagInput from "./common/TagInput.jsx";
import EducationEditor from "./editors/EducationEditor.jsx";
import ExperienceEditor from "./editors/ExperienceEditor.jsx";
import ProjectsEditor from "./editors/ProjectsEditor.jsx";

export default function Dashboard({ data, setData, previewHeight, isLightMode }) {
  return (
    <div
      className="dashboard-container dashboard-sticky transition-theme p-6"
      style={{
        height: previewHeight ? `${previewHeight}px` : undefined,
        overflowY: previewHeight ? "auto" : "visible",
        maxWidth: "100%",
      }}
    >
      {/* Header */}
      <div className="mb-6 pb-4 border-b" style={{ borderColor: "var(--border-secondary)" }}>
        <h3 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          Dashboard
        </h3>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Configura tu información personal y profesional
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Column A - Personal Info */}
        <div className="space-y-6">
          {/* Photo Section */}
          <div className="bg-card p-5 rounded-xl shadow-sm border" style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-secondary)",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
          }}>
            <label className="block text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <span className="text-lg">📸</span>
              <span>Foto de Perfil</span>
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      const url = URL.createObjectURL(f);
                      setData((d) => ({ ...d, photoUrl: url }));
                    }}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/10"
                    style={{
                      borderColor: "var(--border-secondary)",
                      backgroundColor: "var(--bg-primary)",
                      color: "var(--text-secondary)"
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-sm font-medium">Seleccionar foto</span>
                  </label>
                </div>
              </div>
              {data.photoUrl && (
                <div className="relative group">
                  <img
                    src={data.photoUrl}
                    alt="preview"
                    className="w-16 h-16 rounded-xl object-cover shadow-md border-2"
                    style={{ borderColor: "var(--border-secondary)" }}
                  />
                  <button
                    onClick={() => setData((d) => ({ ...d, photoUrl: "" }))}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors shadow-md opacity-0 group-hover:opacity-100 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-card p-5 rounded-xl shadow-sm border" style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-secondary)",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
          }}>
            <label className="block text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <span className="text-lg">📋</span>
              <span>Resumen Profesional</span>
            </label>
            <p className="text-xs mb-3 px-3 py-2 rounded-md" style={{
              color: "var(--text-secondary)",
              backgroundColor: "var(--bg-primary)"
            }}>
              💡 Una línea por logro o punto clave
            </p>
            <textarea
              rows={4}
              value={data.summary.join("\n")}
              onChange={(e) =>
                setData({ ...data, summary: e.target.value.split("\n") })
              }
              className="input-base w-full resize-none border"
              style={{ borderColor: "var(--border-secondary)" }}
              placeholder="• Desarrollador con 5+ años de experiencia&#10;• Especialista en React y Node.js&#10;• Liderazgo de equipos técnicos"
            />
          </div>

          {/* Personal Info Section */}
          <div className="bg-card p-5 rounded-xl shadow-sm border" style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-secondary)",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
          }}>
            <label className="block text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <span className="text-lg">👤</span>
              <span>Información Personal</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nombre completo"
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
            </div>
            <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--border-secondary)" }}>
              <label className="inline-flex items-center gap-3 text-sm cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/10" style={{ color: "var(--text-secondary)" }}>
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-emerald-500 rounded transition-all"
                  checked={data.info.vehicleLicense}
                  onChange={(e) =>
                    setData({
                      ...data,
                      info: { ...data.info, vehicleLicense: e.target.checked },
                    })
                  }
                />
                <span className="flex items-center gap-2">
                  <span>🚗</span>
                  <span>Posee licencia de conducir</span>
                </span>
              </label>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-4">
            <div className="bg-card p-5 rounded-xl shadow-sm border" style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-secondary)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
            }}>
              <TagInput
                label="💻 Plataformas"
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
            </div>

            <div className="bg-card p-5 rounded-xl shadow-sm border" style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-secondary)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
            }}>
              <TagInput
                label="🔧 Lenguajes de programación"
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
          </div>
        </div>

        {/* Column B - Professional Info */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="bg-card p-5 rounded-xl shadow-sm border" style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-secondary)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
            }}>
              <TagInput
                label="🛠️ Herramientas / Frameworks"
                values={data.tools}
                onAdd={(t) => setData({ ...data, tools: [...data.tools, t] })}
                onRemove={(i) =>
                  setData({ ...data, tools: data.tools.filter((_, j) => j !== i) })
                }
              />
            </div>

            <div className="bg-card p-5 rounded-xl shadow-sm border" style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-secondary)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
            }}>
              <TagInput
                label="🌐 Idiomas hablados"
                values={data.spoken}
                onAdd={(t) => setData({ ...data, spoken: [...data.spoken, t] })}
                onRemove={(i) =>
                  setData({ ...data, spoken: data.spoken.filter((_, j) => j !== i) })
                }
              />
            </div>

            <div className="bg-card p-5 rounded-xl shadow-sm border" style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-secondary)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
            }}>
              <TagInput
                label="⭐ Perfil (cualidades)"
                values={data.profile}
                onAdd={(t) => setData({ ...data, profile: [...data.profile, t] })}
                onRemove={(i) =>
                  setData({ ...data, profile: data.profile.filter((_, j) => j !== i) })
                }
              />
            </div>
          </div>

          <div className="bg-card p-5 rounded-xl shadow-sm border" style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-secondary)",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
          }}>
            <TextArea
              label="📝 Acerca de mí"
              value={data.about}
              onChange={(v) => setData({ ...data, about: v })}
              rows={8}
            />
          </div>
        </div>
      </div>

      {/* Sections Divider */}
      <div className="my-10 flex items-center">
        <div className="flex-1 border-t" style={{ borderColor: "var(--border-secondary)" }}></div>
        <div className="px-4 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          Secciones Adicionales
        </div>
        <div className="flex-1 border-t" style={{ borderColor: "var(--border-secondary)" }}></div>
      </div>

      {/* Education Section */}
      <div className="mb-8 bg-card p-6 rounded-xl shadow-sm border" style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-secondary)",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
      }}>
        <EducationEditor
          education={data.education}
          setEducation={(xs) => setData({ ...data, education: xs })}
          itemClassName="added-item-education"
        />
      </div>

      {/* Experience Section */}
      <div className="mb-8 bg-card p-6 rounded-xl shadow-sm border" style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-secondary)",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
      }}>
        <ExperienceEditor
          experiences={data.experiences}
          setExperiences={(xs) => setData({ ...data, experiences: xs })}
          itemClassName="added-item-experience"
        />
      </div>

      {/* Projects Section */}
      <div className="mb-8 bg-card p-6 rounded-xl shadow-sm border" style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-secondary)",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
      }}>
        <ProjectsEditor
          projects={data.projects}
          setProjects={(xs) => setData({ ...data, projects: xs })}
          itemClassName="added-item-project"
        />
      </div>
    </div>
  );
}