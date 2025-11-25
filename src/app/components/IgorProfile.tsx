"use client";

import { motion } from "framer-motion";

export function IgorProfile() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.25, 0.8, 0.25, 1] }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-10 shadow-[0_0_160px_rgba(115,57,199,0.25)] backdrop-blur-lg"
    >
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-ember/30 via-transparent to-transparent blur-[150px]" />
      <header className="relative mb-6">
        <h2 className="text-xs uppercase tracking-[0.4em] text-white/60">Игорь — архетип</h2>
        <p className="mt-3 text-4xl font-semibold text-white">Бывший крепыш, растворённый в тумане площади</p>
      </header>
      <div className="relative grid gap-6 md:grid-cols-2">
        <div className="space-y-4 text-sm leading-relaxed text-white/75">
          <p>
            Телосложение плотное, но размягчённое: живот лениво нависает над ремнём, широкие плечи распались под
            тяжестью лет и непрожитых ночей. Куртка чуть велика, швы подчеркнуты сырым ветром, ткань темнеет от
            влаги. Каждое движение медленное, с оглядкой — будто у него внутри хрустит старый лёд.
          </p>
          <p>
            Лицо цвета кремлёвского бетона, изборожденное трещинами-морщинами от глаз до подбородка. Светло-серые
            глаза почти бесцветны, полосы красных прожилок вспыхивают на каждом порыве ветра. Нос сломан, память
            девяностых, кривизна придаёт профилю хищную настороженность.
          </p>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-white/75">
          <p>
            Губы тонкие, потрескавшиеся, плотно сжаты — голос приходится выдавливать сквозь них. Борода трёхдневная,
            седо-рыжая, растёт клочками: бреется редко, как будто боится стереть единственный остаток тепла. Виски
            выжжены седым полностью, волос едва до ушей, что-то между стрижкой и ветром.
          </p>
          <p>
            В кадре он — распадающийся монолит. Туман липнет к нему, как к позднему памятнику. Фиолетовые вспышки
            вспарывают шрамы под кожей, ища, куда ещё можно ударить. Каждый вдох — короткий, с приглушённым свистом.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
