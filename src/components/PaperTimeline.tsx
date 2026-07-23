import React, { useState, useMemo } from 'react';
import { AcademicPaper } from '../data';
import { 
  BookMarked, 
  Presentation, 
  GraduationCap, 
  ExternalLink, 
  Calendar,
  Filter,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

interface PaperTimelineProps {
  journals: AcademicPaper[];
  conferences: AcademicPaper[];
  dissertations: AcademicPaper[];
}

type CategoryFilter = 'all' | 'journal' | 'conference' | 'dissertation';

interface EnrichedPaper extends AcademicPaper {
  category: 'journal' | 'conference' | 'dissertation';
  categoryLabel: string;
}

export const PaperTimeline: React.FC<PaperTimelineProps> = ({
  journals,
  conferences,
  dissertations
}) => {
  const [activeTab, setActiveTab] = useState<CategoryFilter>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  // Combine and enrich all papers
  const allPapers = useMemo(() => {
    const list: EnrichedPaper[] = [
      ...journals.map(p => ({ ...p, category: 'journal' as const, categoryLabel: '期刊論文' })),
      ...conferences.map(p => ({ ...p, category: 'conference' as const, categoryLabel: '會議論文' })),
      ...dissertations.map(p => ({ ...p, category: 'dissertation' as const, categoryLabel: '碩博士論文' }))
    ];

    // Sort descending by numeric year
    return list.sort((a, b) => {
      const yearA = parseInt(a.year || '0', 10) || 0;
      const yearB = parseInt(b.year || '0', 10) || 0;
      return yearB - yearA;
    });
  }, [journals, conferences, dissertations]);

  // Unique years
  const years = useMemo(() => {
    const set = new Set<string>();
    allPapers.forEach(p => {
      if (p.year) set.add(p.year);
    });
    return Array.from(set).sort((a, b) => (parseInt(b, 10) || 0) - (parseInt(a, 10) || 0));
  }, [allPapers]);

  // Filtered papers
  const filteredPapers = useMemo(() => {
    return allPapers.filter(paper => {
      // Category filter
      if (activeTab !== 'all' && paper.category !== activeTab) {
        return false;
      }
      // Year filter
      if (selectedYear !== 'all' && paper.year !== selectedYear) {
        return false;
      }
      return true;
    });
  }, [allPapers, activeTab, selectedYear]);

  // Group filtered papers by year for timeline rendering
  const papersByYear = useMemo(() => {
    const map = new Map<string, EnrichedPaper[]>();
    filteredPapers.forEach(paper => {
      const yearList = map.get(paper.year) || [];
      yearList.push(paper);
      map.set(paper.year, yearList);
    });
    return Array.from(map.entries()).sort((a, b) => (parseInt(b[0], 10) || 0) - (parseInt(a[0], 10) || 0));
  }, [filteredPapers]);

  const getCategoryBadgeStyle = (category: EnrichedPaper['category']) => {
    switch (category) {
      case 'journal':
        return 'bg-sky-100/90 text-sky-800 border-sky-300';
      case 'conference':
        return 'bg-amber-100/90 text-amber-800 border-amber-300';
      case 'dissertation':
        return 'bg-purple-100/90 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryIcon = (category: EnrichedPaper['category']) => {
    switch (category) {
      case 'journal':
        return <BookMarked className="w-3.5 h-3.5" />;
      case 'conference':
        return <Presentation className="w-3.5 h-3.5" />;
      case 'dissertation':
        return <GraduationCap className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="bg-white rounded-[32px] border border-peach/70 p-6 sm:p-8 shadow-xs hover:border-clay transition-all duration-300 space-y-8">
      {/* Header & Category Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-peach/30">
        <div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-peach/20 rounded-2xl flex items-center justify-center border border-peach text-clay shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-plum">學術發表時間軸</h4>
                <span className="px-2.5 py-0.5 rounded-full bg-peach/30 text-chestnut text-xs font-semibold font-mono">
                  {filteredPapers.length} 篇
                </span>
              </div>
              <p className="text-xs uppercase font-mono text-chestnut/50 font-bold tracking-wider mt-0.5">Academic Publication Timeline</p>
            </div>
          </div>
        </div>

        {/* Links to TKU portal */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium">
          <a
            href="https://teacher.tku.edu.tw/PsnCat.aspx?t=psh_a_author_data&u=t952085"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[#2a6f97] hover:underline"
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>淡江教師歷程：期刊論文</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
          <span className="hidden sm:inline text-peach/60">•</span>
          <a
            href="https://teacher.tku.edu.tw/PsnCat.aspx?t=psh_d_meeting_data&u=t952085"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[#2a6f97] hover:underline"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>淡江教師歷程：會議論文</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
          <span className="hidden sm:inline text-peach/60">•</span>
          <a
            href="https://teacher.tku.edu.tw/PsnCat.aspx?t=psh_author_data_t_lib&u=t952085"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[#2a6f97] hover:underline"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>淡江教師歷程：指導碩博士</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>

      {/* Interactive Controls (Category Tabs & Year Filter) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex flex-col gap-2 p-2 rounded-2xl bg-vanilla/50 border border-peach/40 text-xs font-medium">
          {/* Row 1: 全部 */}
          <div>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-plum text-white shadow-xs font-semibold'
                  : 'text-chestnut/80 hover:text-plum hover:bg-vanilla'
              }`}
            >
              全部 ({allPapers.length})
            </button>
          </div>

          {/* Row 2: 期刊論文, 會議論文, 碩博士論文 */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab('journal')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'journal'
                  ? 'bg-sky-700 text-white shadow-xs font-semibold'
                  : 'text-chestnut/80 hover:text-sky-800 hover:bg-sky-50/50'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              期刊論文 ({journals.length})
            </button>
            <button
              onClick={() => setActiveTab('conference')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'conference'
                  ? 'bg-amber-700 text-white shadow-xs font-semibold'
                  : 'text-chestnut/80 hover:text-amber-800 hover:bg-amber-50/50'
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              會議論文 ({conferences.length})
            </button>
            <button
              onClick={() => setActiveTab('dissertation')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'dissertation'
                  ? 'bg-purple-700 text-white shadow-xs font-semibold'
                  : 'text-chestnut/80 hover:text-purple-800 hover:bg-purple-50/50'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              碩博士論文 ({dissertations.length})
            </button>
          </div>
        </div>

        {/* Year Dropdown */}
        <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-vanilla/40 border border-peach/50 focus-within:border-[#2a6f97] focus-within:bg-white transition-all shrink-0">
          <Filter className="w-3.5 h-3.5 text-chestnut/60 shrink-0 pointer-events-none" />
          <select
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
            className="bg-transparent border-none text-xs text-plum font-medium focus:outline-none cursor-pointer pr-1"
          >
            <option value="all">所有年份</option>
            {years.map(yr => (
              <option key={yr} value={yr}>
                {yr} 年
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="relative pl-3 sm:pl-6 pt-2 pb-4">
        {/* Continuous Left Vertical Line */}
        <div className="absolute left-3 sm:left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-peach via-clay/40 to-peach/20" />

        {papersByYear.length === 0 ? (
          <div className="py-12 text-center text-chestnut/60 font-sans">
            <p className="text-sm">未找到符合條件的論文發表。</p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSelectedYear('all');
              }}
              className="mt-3 px-4 py-1.5 rounded-xl bg-peach/30 text-plum text-xs font-bold hover:bg-peach/50 transition-colors cursor-pointer"
            >
              重置篩選條件
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {papersByYear.map(([year, papers]) => (
              <div key={year} className="relative group">
                {/* Year Marker Badge on the Timeline */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative z-10 flex items-center justify-center -ml-3 sm:-ml-6">
                    <span className="px-3.5 py-1 rounded-full bg-plum text-white text-xs font-bold font-mono shadow-xs border-2 border-white tracking-wider">
                      {year} 年
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-peach/30" />
                  <span className="text-xs text-chestnut/50 font-mono font-medium">
                    {papers.length} 篇發表
                  </span>
                </div>

                {/* Paper items for this year */}
                <div className="ml-4 sm:ml-6 space-y-4">
                  {papers.map((paper, idx) => {
                    const uniqueId = `${year}-${idx}`;

                    return (
                      <motion.div
                        key={uniqueId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative p-5 rounded-2xl bg-vanilla/30 border border-peach/40 hover:bg-vanilla/60 hover:border-peach/80 transition-all space-y-3 group/card"
                      >
                        {/* Header: Badges & Tags */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Category Badge */}
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg border text-xs font-bold ${getCategoryBadgeStyle(paper.category)}`}>
                              {getCategoryIcon(paper.category)}
                              <span>{paper.categoryLabel}</span>
                            </span>

                            {/* Tags (e.g. TSSCI, ESCI) */}
                            {paper.tags && paper.tags.map((tag, tIdx) => (
                              <span key={tIdx} className="px-2 py-0.5 rounded-lg bg-rose-100/80 text-rose-800 border border-rose-200 text-xs font-bold tracking-wide">
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Link to Repository */}
                          {paper.url && (
                            <div className="flex items-center shrink-0">
                              <a
                                href={paper.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#2a6f97]/10 text-[#2a6f97] hover:bg-[#2a6f97] hover:text-white transition-all text-xs font-semibold"
                              >
                                <span>典藏連結</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <div className="space-y-1">
                          <h5 className="text-base sm:text-lg font-serif font-bold text-plum leading-snug">
                            {paper.title}
                          </h5>
                          {paper.altTitle && (
                            <p className="text-xs sm:text-sm text-chestnut/70 font-sans">
                              {paper.altTitle}
                            </p>
                          )}
                        </div>

                        {/* Authors & Publication Date */}
                        <div className="text-xs sm:text-sm font-sans text-chestnut/80 leading-relaxed space-y-1 border-t border-peach/20 pt-2.5">
                          <p className="font-semibold text-plum/90">
                            <span className="text-chestnut/50 font-normal mr-2">著者：</span>
                            {paper.authors}
                          </p>
                          {paper.source && (
                            <p className="text-chestnut/80">
                              <span className="text-chestnut/50 font-normal mr-2">期刊/研討會：</span>
                              {paper.source}
                            </p>
                          )}
                          <p className="text-chestnut/80">
                            <span className="text-chestnut/50 font-normal mr-2">發表日期：</span>
                            {paper.publishDate || `${paper.year} 年`}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
