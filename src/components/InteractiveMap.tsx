import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, School, Building, Users, Award, Compass, Sparkles, ArrowRight, ZoomIn, ZoomOut, RotateCcw, Move } from "lucide-react";
// @ts-ignore
import taiwanImage from "../taiwan.png";

interface MapLocation {
  id: string;
  name: string;
  city: string;
  role: string;
  project: string;
  description: string;
  type: "academic" | "industry" | "government" | "community";
  x: number; // 0-100 relative positioning
  y: number; // 0-100 relative positioning
}

const locations: MapLocation[] = [
  {
    id: "tk",
    name: "淡江大學教育科技學系",
    city: "新北市淡水區",
    role: "研究與教學基地 (現任助理教授)",
    project: "AR/VR 沉浸式多媒體教材研發、教育科技核心授課",
    description: "淡江大學為研究與學術活動核心基地，在此開展融合 AR/VR 之創新數位教材設計研究，開設「數位內容設計」、「多媒體教材研發」等前沿課程，致力於培育科技教育實務菁英。",
    type: "academic",
    x: 52.4,
    y: 12.7,
  },
  {
    id: "sju",
    name: "醒吾科技大學",
    city: "新北市林口區",
    role: "高教深耕計畫行政與管考經驗 (曾任副研發長)",
    project: "教育部大型計畫管考、安心助學計畫推動、產學研發專案統籌",
    description: "曾在此擔任副研發長、計畫管考中心主任等核心行政主管，管理教育部及科技部大型計畫。所主導規劃的安心助學計畫於2018年獲教育部優化指派推廣。",
    type: "academic",
    x: 51.2,
    y: 14.5,
  },
  {
    id: "moe",
    name: "教育部",
    city: "台北市中正區",
    role: "教育部政策與計畫執行經驗",
    project: "教育部 VR/AR 教材開發推動及示範計畫、教育部產業學院計畫",
    description: "擔參與教育部全國性數位教材推動計畫，協助跨校合作、計畫執行與成果推廣；並擔任產業學院計畫主持人，統籌生成式 AI 應用課程規劃、產學合作推動及計畫執行管理。",
    type: "government",
    x: 53.0,
    y: 13.5,
  },
  {
    id: "jt",
    name: "瀚荃股份有限公司",
    city: "新北市淡水區",
    role: "教育科技與企業數位轉型",
    project: "ESG 導入與創新轉型輔導教育訓練推廣計畫",
    description: "擔任產學計畫主持人，運用教育科技方法規劃企業教育訓練，推動 ESG 與碳盤查知識導入，建置數位教材及知識網站，協助中小企業建立永續轉型所需的學習資源與培訓機制。",
    type: "industry",
    x: 51.1,
    y: 14.6,
  }
];

const categoryInfo = {
  all: { label: "全部據點" },
  academic: { label: "學術交流" },
  government: { label: "政府專案" },
  industry: { label: "產學合作" }
};

export function InteractiveMap() {
  const [activeCategory, setActiveCategory] = useState<
    "all" | "academic" | "government" | "industry"
  >("all");
  const [selectedLoc, setSelectedLoc] = useState<MapLocation>(locations[0]);
  const [zoomScale, setZoomScale] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const mapParentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => {
      const next = Math.max(prev - 0.25, 1);
      if (next === 1) {
        setMapPosition({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const handleReset = () => {
    setZoomScale(1);
    setMapPosition({ x: 0, y: 0 });
  };

  const filteredLocations = locations.filter(
    (loc) => activeCategory === "all" || loc.type === activeCategory
  );

  // 為了防重疊與緊貼，在此對點位坐標進行動態微調 (Spiderfy)
  const getAdjustedPosition = (loc: MapLocation, allLocs: MapLocation[]) => {
    const neighbors = allLocs.filter(l => {
      const dist = Math.sqrt(Math.pow(l.x - loc.x, 2) + Math.pow(l.y - loc.y, 2));
      return dist < 2.2;
    });

    if (neighbors.length <= 1) {
      return { x: loc.x, y: loc.y };
    }

    const sortedNeighbors = [...neighbors].sort((a, b) => a.id.localeCompare(b.id));
    const index = sortedNeighbors.findIndex(l => l.id === loc.id);

    const angle = (index * 2 * Math.PI) / neighbors.length;
    const radius = 2.0;

    const centerX = neighbors.reduce((sum, n) => sum + n.x, 0) / neighbors.length;
    const centerY = neighbors.reduce((sum, n) => sum + n.y, 0) / neighbors.length;

    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };

  // 點擊後選取據點
  const handleSelectLoc = (loc: MapLocation) => {
    setSelectedLoc(loc);
  };

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-peach/40 shadow-sm p-6 sm:p-8 space-y-8">
      {/* Upper header with explanation */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5 text-left">
          <div className="flex items-center gap-2 text-clay">
            <Compass className="w-4 h-4 animate-spin-slow text-clay" />
            <span className="text-[10px] font-bold tracking-widest uppercase font-mono">
              COLLABORATION NETWORK
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-plum font-bold">
            學術交流與產學合作地圖
          </h3>
          <p className="text-chestnut/60 text-xs font-normal">
            點擊地圖上的各個合作據點或透過下方清單快速切換，深入瞭解學術整合、政府計畫與產學合作成果
          </p>
        </div>

        {/* Filter categories tabs */}
        <div className="flex flex-wrap gap-1.5 self-start md:self-end">
          {(Object.keys(categoryInfo) as Array<keyof typeof categoryInfo>).map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  // Auto select first match in category
                  const matches = locations.filter((l) => cat === "all" || l.type === cat);
                  if (matches.length > 0 && !matches.includes(selectedLoc)) {
                    handleSelectLoc(matches[0]);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#2a6f97] text-white shadow-xs font-bold"
                    : "bg-vanilla hover:bg-peach/10 text-chestnut/80 border border-peach/30"
                }`}
              >
                {categoryInfo[cat].label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Elegant Guide Prompt Banner */}
      <div className="bg-[#eef4f8]/80 rounded-2xl border border-[#2a6f97]/15 p-3 flex flex-col sm:flex-row items-center justify-center gap-2.5 text-xs text-plum font-sans font-bold shadow-xs">
        <Sparkles className="w-4 h-4 text-[#2a6f97] shrink-0 animate-pulse" />
        <span className="text-center sm:text-left leading-relaxed">
          💡 <b>互動導覽提示：</b>可直接點擊地圖上的標記，或使用下方「快速選取據點」按鈕來觀看詳細合作介紹。
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Dynamic Vector Map Container + Quick Switcher List */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div ref={mapParentRef} className="relative w-full bg-gradient-to-b from-[#eef4f8]/50 to-[#fdfbf7]/50 rounded-2xl border border-peach/30 p-6 flex items-center justify-center min-h-[380px] sm:min-h-[460px] overflow-hidden select-none">
            {/* Decorative Grid Lines */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#2a6f97 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
            
            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-peach/30 shadow-md">
              <button
                onClick={handleZoomIn}
                disabled={zoomScale >= 3}
                className="p-1.5 rounded-lg hover:bg-peach/15 text-[#2a6f97] disabled:text-chestnut/30 disabled:hover:bg-transparent transition-colors duration-200 cursor-pointer"
                title="放大地圖"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                disabled={zoomScale <= 1}
                className="p-1.5 rounded-lg hover:bg-peach/15 text-[#2a6f97] disabled:text-chestnut/30 disabled:hover:bg-transparent transition-colors duration-200 cursor-pointer"
                title="縮小地圖"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              {zoomScale > 1 && (
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg hover:bg-peach/15 text-clay transition-colors duration-200 cursor-pointer flex items-center justify-center border-t border-peach/10 mt-0.5 pt-1.5"
                  title="重設縮放"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Drag Hint Badge */}
            {zoomScale > 1 && (
              <div className="absolute top-4 left-4 z-20 bg-[#2a6f97]/90 backdrop-blur-xs text-white text-[10px] px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm font-sans tracking-wide font-bold animate-pulse">
                <Move className="w-3.5 h-3.5" />
                <span>拖曳移動地圖</span>
              </div>
            )}

            {/* Centered Map and Markers Wrapper */}
            <motion.div
              ref={mapRef}
              drag={zoomScale > 1}
              dragConstraints={mapParentRef}
              dragElastic={0.15}
              animate={{
                scale: zoomScale,
                x: mapPosition.x,
                y: mapPosition.y,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className="relative w-full max-w-[500px] md:max-w-[550px] aspect-[1560/1028] flex-shrink-0 mx-auto origin-center touch-none select-none"
              style={{ cursor: zoomScale > 1 ? "grab" : "default" }}
            >
              {/* Elegant Taiwan Map Image Backdrop */}
              <img
                src={taiwanImage}
                alt="Taiwan Map"
                className="w-full h-full object-cover opacity-[0.95] drop-shadow-md rounded-xl pointer-events-none select-none"
                referrerPolicy="no-referrer"
              />

              {/* Core SVG Workspace overlaying the interactive nodes */}
              <div className="absolute inset-0 z-10 w-full h-full">
                <svg className="w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  {/* Dynamic Connecting Curved Lines (From any selected point to Tamkang University) */}
                  <AnimatePresence>
                    {selectedLoc && selectedLoc.id !== "tk" && (() => {
                      const adjSelected = getAdjustedPosition(selectedLoc, filteredLocations);
                      const tkLoc = locations.find(l => l.id === "tk") || locations[0];
                      const adjTk = getAdjustedPosition(tkLoc, filteredLocations);
                      return (
                        <motion.path
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.55 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                          d={`M ${adjSelected.x}% ${adjSelected.y}% Q ${(adjSelected.x + adjTk.x) / 2 - 4}% ${(adjSelected.y + adjTk.y) / 2 - 6}% ${adjTk.x}% ${adjTk.y}%`}
                          fill="none"
                          stroke="#2a6f97"
                          strokeWidth="2"
                          strokeDasharray="4,4"
                        />
                      );
                    })()}
                  </AnimatePresence>
                </svg>

                {/* Plotting active locations onto container absolute positions */}
                {filteredLocations.map((loc) => {
                  const isSelected = selectedLoc?.id === loc.id;
                  const adjPos = getAdjustedPosition(loc, filteredLocations);
                  
                  // Custom color coding for markers
                  let pinBg = "bg-[#2a6f97]";
                  if (loc.type === "government") pinBg = "bg-[#dfab6c]";
                  if (loc.type === "industry") pinBg = "bg-[#9ec4c7]";
                  if (loc.type === "community") pinBg = "bg-[#c17a74]";

                  return (
                    <div
                      key={loc.id}
                      style={{ left: `${adjPos.x}%`, top: `${adjPos.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto"
                    >
                      <button
                        onClick={() => handleSelectLoc(loc)}
                        className="relative group focus:outline-none cursor-pointer animate-none"
                        aria-label={loc.name}
                      >
                        {/* Quiet High-Quality Outer Rings */}
                        <span className="absolute -inset-4 flex items-center justify-center pointer-events-none">
                          <span className={`w-8 h-8 rounded-full opacity-20 absolute ${pinBg} transition-transform duration-300 ${
                            isSelected ? "scale-110 opacity-30 animate-pulse" : "scale-0 group-hover:scale-100"
                          }`} />
                        </span>

                        {/* Central Pin Dot */}
                        <div
                          className={`relative z-10 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shadow-md transition-all duration-300 ${
                            isSelected 
                              ? `${pinBg} scale-125 ring-4 ring-[#2a6f97]/20` 
                              : `${pinBg} hover:scale-115`
                          }`}
                        >
                          {/* Anchor Dot Center */}
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>

                        {/* Map Tooltip Label on Hover (only when NOT selected) */}
                        {!isSelected && (
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-[#6d8faa] text-white text-[10px] py-1 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-sm font-sans tracking-wide font-bold pointer-events-none">
                            {loc.name.split(" ")[0]}
                          </div>
                        )}

                        {/* Animated Selected Rich Tooltip */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8, y: 10, x: "-50%" }}
                              animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                              exit={{ opacity: 0, scale: 0.8, y: 10, x: "-50%" }}
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                              className="absolute bottom-full left-1/2 mb-3 z-30 w-56 bg-[#6d8faa]/95 backdrop-blur-md text-white p-3.5 rounded-xl shadow-xl flex flex-col gap-1.5 pointer-events-auto text-left"
                            >
                              <div className="flex items-center justify-between gap-1.5 border-b border-white/10 pb-1.5">
                                <span className="text-[10px] font-sans text-white font-bold leading-tight line-clamp-1">
                                  {loc.name}
                                </span>
                                <span className="text-[8px] font-mono text-[#9ec4c7] shrink-0 font-bold bg-white/10 px-1.5 py-0.5 rounded-sm">
                                  {categoryInfo[loc.type].label}
                                </span>
                              </div>
                              <p className="text-[9px] text-white/90 font-medium leading-relaxed">
                                {loc.role}
                              </p>
                              <p className="text-[8px] text-white/70 font-light line-clamp-2 leading-relaxed">
                                {loc.project}
                              </p>
                              <div className="text-[8px] text-[#dfab6c] font-bold flex items-center justify-between mt-1">
                                <span>
                                  <span className="hidden lg:inline">檢視右側專案詳情</span>
                                  <span className="inline lg:hidden">檢視下方專案詳情</span>
                                </span>
                                <ArrowRight className="w-2.5 h-2.5 shrink-0" />
                              </div>
                              {/* Triangle Arrow below the bubble */}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-[#6d8faa]/95" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Map Legend */}
            <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-xs py-1.5 px-3 rounded-lg border border-peach/20 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] font-sans font-bold text-chestnut/70">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#2a6f97]" /> 學術交流</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#dfab6c]" /> 政府專案</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#9ec4c7]" /> 產學合作</span>
            </div>
          </div>

          {/* Quick Selection Buttons for Mobile & Desktop Accessibility */}
          <div className="bg-vanilla/40 border border-peach/40 rounded-2xl p-4 sm:p-5 space-y-3 text-left shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-plum font-serif">
              <MapPin className="w-3.5 h-3.5 text-clay shrink-0" />
              <span>快速選取據點（點擊直接切換）：</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filteredLocations.map((loc) => {
                const isSelected = selectedLoc?.id === loc.id;
                let colorClass = "border-[#2a6f97]/30 text-[#2a6f97] hover:bg-[#2a6f97]/10";
                if (loc.type === "government") colorClass = "border-[#dfab6c]/30 text-chestnut hover:bg-[#dfab6c]/10";
                if (loc.type === "industry") colorClass = "border-[#9ec4c7]/30 text-chestnut hover:bg-[#9ec4c7]/10";
                if (loc.type === "community") colorClass = "border-[#c17a74]/30 text-chestnut hover:bg-[#c17a74]/10";

                return (
                  <button
                    key={loc.id}
                    onClick={() => handleSelectLoc(loc)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer border transition-all duration-300 ${
                      isSelected
                        ? "bg-[#2a6f97] border-[#2a6f97] text-white shadow-xs scale-[1.02]"
                        : `bg-white/80 ${colorClass}`
                    }`}
                  >
                    {loc.name.split(" ")[0]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Info Card */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {selectedLoc ? (
              <motion.div
                key={selectedLoc.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.4 }}
                className="bg-vanilla/40 border border-peach/50 rounded-2xl p-6 sm:p-7 space-y-6 flex-1 flex flex-col justify-between text-left"
              >
                <div className="space-y-4">
                  {/* Category Pill Tag & Location */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-peach/20 pb-3.5">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg text-white shadow-xs ${
                        selectedLoc.type === "academic" ? "bg-[#2a6f97]" :
                        selectedLoc.type === "government" ? "bg-[#dfab6c]" :
                        selectedLoc.type === "industry" ? "bg-[#9ec4c7]" : "bg-[#c17a74]"
                      }`}>
                        {selectedLoc.type === "academic" && <School className="w-3.5 h-3.5" />}
                        {selectedLoc.type === "government" && <Award className="w-3.5 h-3.5" />}
                        {selectedLoc.type === "industry" && <Building className="w-3.5 h-3.5" />}
                        {selectedLoc.type === "community" && <Users className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-clay">
                        {categoryInfo[selectedLoc.type].label}
                      </span>
                    </div>

                    <span className="text-[11px] font-sans text-chestnut/60 font-bold bg-peach/20 px-2.5 py-1 rounded-full">
                      📍 {selectedLoc.city}
                    </span>
                  </div>

                  {/* Title and Role */}
                  <div className="space-y-1">
                    <h4 className="font-serif text-lg sm:text-2xl text-plum font-bold tracking-tight">
                      {selectedLoc.name}
                    </h4>
                    <p className="text-clay text-xs sm:text-sm font-medium font-sans">
                      {selectedLoc.role}
                    </p>
                  </div>

                  {/* Highlight Project banner */}
                  <div className="p-4 bg-[#eef4f8] rounded-xl border border-peach/30 text-left space-y-1">
                    <span className="text-[9px] font-bold text-chestnut/50 uppercase tracking-widest block">合作主體 / 執行專案:</span>
                    <p className="text-plum font-serif text-xs sm:text-sm font-bold leading-relaxed">
                      {selectedLoc.project}
                    </p>
                  </div>

                  {/* Core Description */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-chestnut/50 uppercase tracking-widest block">專案歷程與實務整合詳情:</span>
                    <p className="text-chestnut/80 text-xs sm:text-sm leading-relaxed font-normal">
                      {selectedLoc.description}
                    </p>
                  </div>
                </div>

                {/* Micro CTA footer */}
                <div className="pt-6 border-t border-peach/20 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
                  {selectedLoc.id === "tk" && (
                    <div className="flex items-center gap-1.5 text-xs text-[#2a6f97] font-bold hover:underline select-none">
                      <span>學科核心研究基地</span>
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    </div>
                  )}

                  {selectedLoc.id !== "tk" && (
                    <div className="flex items-center gap-1 text-xs text-[#2a6f97] font-semibold">
                      <span>淡江大學</span>
                      <ArrowRight className="w-3 h-3 text-clay" />
                      <span>跨校產學連動</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="bg-vanilla/20 border border-dashed border-peach/40 rounded-2xl p-8 text-center flex flex-col items-center justify-center h-full min-h-[300px] text-chestnut/60 space-y-3">
                <Compass className="w-10 h-10 text-peach animate-bounce" />
                <p className="text-sm font-medium">請選擇地圖上的任一據點，查看該次學術交流或產學合作詳情。</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
