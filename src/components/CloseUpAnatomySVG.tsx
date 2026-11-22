import React from 'react';
import { AnatomyCloseUpId } from '../data/bodyVocabulary';

interface CloseUpAnatomySVGProps {
  part: AnatomyCloseUpId;
  className?: string;
}

export const CloseUpAnatomySVG: React.FC<CloseUpAnatomySVGProps> = ({ part, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 240"
      className={`w-full h-auto select-none ${className}`}
      role="img"
      aria-label={`Ilustrasi anatomi detail bagian ${part}`}
    >
      <defs>
        {/* Soft natural warm-peach child skin gradients */}
        <radialGradient id="cu-skin-radial" cx="48%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#FFE1C9" />
          <stop offset="65%" stopColor="#F8C8A6" />
          <stop offset="100%" stopColor="#E4A882" />
        </radialGradient>
        <linearGradient id="cu-skin-linear" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE2CB" />
          <stop offset="60%" stopColor="#F7C5A2" />
          <stop offset="100%" stopColor="#DF9F78" />
        </linearGradient>
        <linearGradient id="cu-skin-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E2A47E" />
          <stop offset="100%" stopColor="#C9835E" />
        </linearGradient>
        {/* Iris gradient */}
        <radialGradient id="cu-iris" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#7C4A26" />
          <stop offset="55%" stopColor="#522D14" />
          <stop offset="88%" stopColor="#351A09" />
          <stop offset="100%" stopColor="#231004" />
        </radialGradient>
        {/* Sclera subtle spherical shading */}
        <radialGradient id="cu-sclera" cx="50%" cy="48%" r="54%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="78%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#DCE3EC" />
        </radialGradient>
        {/* Lip shading */}
        <linearGradient id="cu-lip-upper" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D66D6D" />
          <stop offset="100%" stopColor="#B84B4E" />
        </linearGradient>
        <linearGradient id="cu-lip-lower" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E37C7A" />
          <stop offset="55%" stopColor="#EC8F8C" />
          <stop offset="100%" stopColor="#C45759" />
        </linearGradient>
        {/* Hair gradient */}
        <linearGradient id="cu-hair" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3F2B21" />
          <stop offset="50%" stopColor="#2B1C14" />
          <stop offset="100%" stopColor="#1B100B" />
        </linearGradient>
        {/* Nail sheen */}
        <linearGradient id="cu-nail" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF5F2" />
          <stop offset="70%" stopColor="#FADBD3" />
          <stop offset="100%" stopColor="#ECC1B5" />
        </linearGradient>
        {/* Soft studio backdrop */}
        <radialGradient id="cu-backdrop" cx="50%" cy="48%" r="65%">
          <stop offset="0%" stopColor="#F0F9FF" />
          <stop offset="100%" stopColor="#E2EEF8" />
        </radialGradient>
      </defs>

      {/* Clean framed anatomical backdrop */}
      <rect x="0" y="0" width="320" height="240" rx="18" fill="url(#cu-backdrop)" />
      <circle cx="160" cy="120" r="105" fill="#FFFFFF" opacity="0.55" />

      {part === 'head' && (
        <g>
          {/* Neck & collar */}
          <path d="M135 178 L135 215 Q160 226 185 215 L185 178 Z" fill="url(#cu-skin-shadow)" />
          <path d="M139 182 Q160 195 181 182 L181 196 Q160 205 139 196 Z" fill="#C98863" opacity="0.35" />
          <path d="M108 214 Q160 232 212 214 L224 240 L96 240 Z" fill="#0284C7" />
          <path d="M132 210 Q160 228 188 210 L176 226 L160 220 L144 226 Z" fill="#FFFFFF" />

          {/* Ears */}
          <ellipse cx="97" cy="125" rx="12" ry="20" fill="url(#cu-skin-linear)" stroke="#C88A65" strokeWidth="1.5" />
          <path d="M94 115 Q89 125 95 135" fill="none" stroke="#B77450" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="223" cy="125" rx="12" ry="20" fill="url(#cu-skin-linear)" stroke="#C88A65" strokeWidth="1.5" />
          <path d="M226 115 Q231 125 225 135" fill="none" stroke="#B77450" strokeWidth="1.8" strokeLinecap="round" />

          {/* Back hair */}
          <path d="M92 104 Q88 45 160 36 Q232 45 228 104 Z" fill="url(#cu-hair)" />

          {/* Cranium & face contour */}
          <path
            d="M100 96 C99 145, 118 186, 160 189 C202 186, 221 145, 220 96 C220 58, 195 44, 160 44 C125 44, 100 58, 100 96 Z"
            fill="url(#cu-skin-radial)"
            stroke="#D1946E"
            strokeWidth="1.5"
          />

          {/* Subtle cheek warmth */}
          <ellipse cx="122" cy="140" rx="14" ry="8" fill="#F29587" opacity="0.26" />
          <ellipse cx="198" cy="140" rx="14" ry="8" fill="#F29587" opacity="0.26" />

          {/* Layered natural front hair */}
          <path
            d="M96 105 C95 62, 122 34, 162 34 C203 34, 226 62, 224 105 C218 82, 204 68, 188 64 C174 75, 152 80, 128 73 C114 82, 103 92, 96 105 Z"
            fill="url(#cu-hair)"
          />
          <path d="M128 52 Q160 40 194 52" fill="none" stroke="#5A4033" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

          {/* Eyebrows */}
          <path d="M119 102 Q134 95 147 101" fill="none" stroke="#2D1D14" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M173 101 Q186 95 201 102" fill="none" stroke="#2D1D14" strokeWidth="3.2" strokeLinecap="round" />

          {/* Eyes */}
          {[134, 186].map((cx) => (
            <g key={cx}>
              <path d={`M${cx - 13} 116 Q${cx} 107 ${cx + 13} 116 Q${cx} 123 ${cx - 13} 116 Z`} fill="url(#cu-sclera)" stroke="#9A684C" strokeWidth="1.2" />
              <circle cx={cx} cy="116" r="6.3" fill="url(#cu-iris)" />
              <circle cx={cx} cy="116" r="3" fill="#0F172A" />
              <circle cx={cx - 2} cy="113.8" r="1.6" fill="#FFFFFF" />
              <path d={`M${cx - 13} 114 Q${cx} 106 ${cx + 13} 114`} fill="none" stroke="#362016" strokeWidth="2" strokeLinecap="round" />
            </g>
          ))}

          {/* Nose */}
          <path d="M159 118 L156 136 Q160 142 165 137" fill="none" stroke="#C5815D" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="155" cy="139" rx="2.2" ry="1.3" fill="#A96949" opacity="0.7" />
          <ellipse cx="165" cy="139" rx="2.2" ry="1.3" fill="#A96949" opacity="0.7" />

          {/* Smile */}
          <path d="M142 155 Q160 169 178 155 Q160 160 142 155 Z" fill="#FFFFFF" stroke="#B65555" strokeWidth="1.6" />
          <path d="M145 159 Q160 171 175 159" fill="none" stroke="#C86362" strokeWidth="2.2" strokeLinecap="round" />

          {/* Subtle anatomical label guide */}
          <path d="M88 46 Q160 22 232 46" fill="none" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.55" />
        </g>
      )}

      {(part === 'eyes' || part === 'eye') && (
        <g>
          {/* Face bridge backdrop for eye close-up */}
          <rect x="26" y="42" width="268" height="156" rx="34" fill="url(#cu-skin-radial)" stroke="#DDA482" strokeWidth="1.5" />
          {/* Nose bridge subtle shading */}
          <path d="M148 92 Q154 135 147 175" fill="none" stroke="#D1926E" strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
          <path d="M172 92 Q166 135 173 175" fill="none" stroke="#D1926E" strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
          <path d="M156 96 L156 162" fill="none" stroke="#FFF1E6" strokeWidth="5" strokeLinecap="round" opacity="0.45" />

          {/* Eyebrows with hair-stroke texture */}
          <g stroke="#2C1B12" strokeLinecap="round">
            <path d="M55 82 Q92 64 132 79" fill="none" strokeWidth="6.5" />
            <path d="M62 80 L67 74 M78 75 L84 69 M96 72 L103 68 M114 74 L121 72" fill="none" strokeWidth="1.8" opacity="0.55" />
            <path d="M188 79 Q228 64 265 82" fill="none" strokeWidth="6.5" />
            <path d="M258 80 L253 74 M242 75 L236 69 M224 72 L217 68 M206 74 L199 72" fill="none" strokeWidth="1.8" opacity="0.55" />
          </g>

          {/* Left Eye (Viewer's Left) — Always Open */}
          <g>
            {/* Upper eyelid crease */}
            <path d="M56 112 Q95 88 134 114" fill="none" stroke="#B97B59" strokeWidth="2" strokeLinecap="round" />
            {/* Sclera */}
            <path
              d="M54 123 C68 103, 120 103, 134 124 C120 142, 68 142, 54 123 Z"
              fill="url(#cu-sclera)"
              stroke="#A16C4E"
              strokeWidth="1.6"
            />
            {/* Inner eye corner (caruncle) */}
            <path d="M127 123 Q132 121 134 124 Q131 127 126 125 Z" fill="#E89D99" />
            {/* Iris */}
            <circle cx="94" cy="123" r="16.5" fill="url(#cu-iris)" stroke="#1E1007" strokeWidth="1.3" />
            {/* Iris fibers */}
            <circle cx="94" cy="123" r="12.5" fill="none" stroke="#9B6237" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.65" />
            {/* Pupil */}
            <circle cx="94" cy="123" r="7.5" fill="#0B1120" />
            {/* Corneal reflections */}
            <circle cx="88.5" cy="117.5" r="3.6" fill="#FFFFFF" />
            <circle cx="99.5" cy="128" r="1.5" fill="#FFFFFF" opacity="0.85" />
            {/* Upper lash line & lashes */}
            <path d="M54 123 C68 103, 120 103, 134 124" fill="none" stroke="#24150E" strokeWidth="3.4" strokeLinecap="round" />
            <path
              d="M60 116 L54 109 M72 110 L68 102 M86 107 L85 98 M101 107 L103 99 M116 111 L120 104 M127 117 L132 112"
              fill="none"
              stroke="#24150E"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Lower eyelid contour */}
            <path d="M62 132 Q94 146 128 130" fill="none" stroke="#C58867" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          </g>

          {/* Right Eye (Viewer's Right) — Open for 'eyes', Closed/Winking for 'eye' */}
          {part === 'eyes' ? (
            <g>
              <path d="M186 114 Q225 88 264 112" fill="none" stroke="#B97B59" strokeWidth="2" strokeLinecap="round" />
              <path
                d="M186 124 C200 103, 252 103, 266 123 C252 142, 200 142, 186 124 Z"
                fill="url(#cu-sclera)"
                stroke="#A16C4E"
                strokeWidth="1.6"
              />
              <path d="M186 124 Q188 121 193 123 Q190 127 186 124 Z" fill="#E89D99" />
              <circle cx="226" cy="123" r="16.5" fill="url(#cu-iris)" stroke="#1E1007" strokeWidth="1.3" />
              <circle cx="226" cy="123" r="12.5" fill="none" stroke="#9B6237" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.65" />
              <circle cx="226" cy="123" r="7.5" fill="#0B1120" />
              <circle cx="220.5" cy="117.5" r="3.6" fill="#FFFFFF" />
              <circle cx="231.5" cy="128" r="1.5" fill="#FFFFFF" opacity="0.85" />
              <path d="M186 124 C200 103, 252 103, 266 123" fill="none" stroke="#24150E" strokeWidth="3.4" strokeLinecap="round" />
              <path
                d="M193 117 L188 112 M204 111 L200 104 M219 107 L217 99 M234 107 L235 98 M248 110 L252 102 M260 116 L266 109"
                fill="none"
                stroke="#24150E"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="M192 130 Q226 146 258 132" fill="none" stroke="#C58867" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            </g>
          ) : (
            <g>
              {/* Winking closed eyelid */}
              <path d="M188 115 Q226 104 263 118" fill="none" stroke="#BA7D5B" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
              <path
                d="M186 124 Q226 139 266 123"
                fill="none"
                stroke="#24150E"
                strokeWidth="3.8"
                strokeLinecap="round"
              />
              {/* Downward closed eyelashes */}
              <path
                d="M196 127 L192 134 M211 131 L209 139 M227 132 L227 140 M243 130 L246 138 M257 126 L262 133"
                fill="none"
                stroke="#24150E"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Cheek lift warmth on wink */}
              <ellipse cx="228" cy="156" rx="20" ry="9" fill="#F08B82" opacity="0.32" />
            </g>
          )}

          {/* Subtle count callouts at bottom */}
          <text
            x="160"
            y="222"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={part === 'eyes' ? '#0369A1' : '#B45309'}
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            {part === 'eyes' ? '2 Mata Terbuka → Two Eyes (Plural)' : '1 Mata Terbuka · 1 Berkedip → One Eye (Singular)'}
          </text>
        </g>
      )}

      {part === 'ears' && (
        <g>
          {/* Side of cheek & hairline for realistic ear context */}
          <path d="M40 30 L150 30 Q145 120 155 210 L40 210 Z" fill="url(#cu-skin-radial)" opacity="0.7" />
          <path d="M40 30 Q95 45 105 95 Q110 150 85 210 L40 210 Z" fill="url(#cu-hair)" />

          {/* Detailed Right Auricle (Outer Ear) */}
          <g transform="translate(15, 0)">
            {/* Outer Helix */}
            <path
              d="M118 76 C122 44, 178 36, 194 74 C208 106, 195 148, 176 172 C164 188, 146 202, 128 195 C115 190, 114 174, 122 162"
              fill="url(#cu-skin-linear)"
              stroke="#B77550"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Inner Helix rim shadow (Scapha) */}
            <path
              d="M128 76 C132 54, 172 49, 182 79 C192 106, 182 140, 165 162"
              fill="none"
              stroke="#C5815B"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.45"
            />
            {/* Antihelix Y-ridge */}
            <path
              d="M137 82 C145 72, 167 76, 171 99 C174 119, 162 142, 146 154"
              fill="none"
              stroke="#FFE6D3"
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.75"
            />
            <path
              d="M137 82 C145 72, 167 76, 171 99 C174 119, 162 142, 146 154"
              fill="none"
              stroke="#BA7854"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Concha bowl (deep shadow) */}
            <path
              d="M132 105 C145 95, 160 105, 158 128 C156 146, 140 155, 130 144 Z"
              fill="#C7815D"
              opacity="0.65"
            />
            {/* Ear canal opening */}
            <ellipse cx="134" cy="127" rx="7" ry="10" fill="#8C4E32" opacity="0.7" />
            {/* Tragus & Antitragus */}
            <path d="M118 112 Q132 122 120 138" fill="url(#cu-skin-linear)" stroke="#B77550" strokeWidth="2" strokeLinecap="round" />
            {/* Soft Earlobe */}
            <path d="M126 170 Q138 190 154 176" fill="none" stroke="#C5815B" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
          </g>

          {/* Acoustic sound waves + music notes */}
          <g stroke="#0284C7" fill="none" strokeLinecap="round">
            <path d="M225 96 Q240 118 225 140" strokeWidth="3" opacity="0.85" />
            <path d="M242 82 Q264 118 242 154" strokeWidth="3" opacity="0.6" />
            <path d="M259 68 Q288 118 259 168" strokeWidth="3" opacity="0.35" />
          </g>
          <g fill="#0284C7">
            <circle cx="258" cy="54" r="5" />
            <path d="M262 54 L262 32 L279 28 L279 48" stroke="#0284C7" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="275" cy="49" r="5" />
          </g>
        </g>
      )}

      {part === 'nose' && (
        <g>
          {/* Face center backdrop */}
          <rect x="44" y="28" width="232" height="184" rx="34" fill="url(#cu-skin-radial)" stroke="#DDA482" strokeWidth="1.5" />
          {/* Inner eyebrows hint at top */}
          <path d="M78 52 Q105 46 126 56" fill="none" stroke="#362218" strokeWidth="4.5" strokeLinecap="round" opacity="0.75" />
          <path d="M242 52 Q215 46 194 56" fill="none" stroke="#362218" strokeWidth="4.5" strokeLinecap="round" opacity="0.75" />

          {/* Nasal bridge & lateral shading */}
          <path d="M142 62 C141 96, 134 122, 126 140" fill="none" stroke="#D3926D" strokeWidth="4" strokeLinecap="round" opacity="0.55" />
          <path d="M178 62 C179 96, 186 122, 194 140" fill="none" stroke="#D3926D" strokeWidth="4" strokeLinecap="round" opacity="0.55" />
          {/* Nasal bridge highlight */}
          <path d="M160 64 L160 132" fill="none" stroke="#FFF4EA" strokeWidth="10" strokeLinecap="round" opacity="0.65" />

          {/* Nose tip & alar wings */}
          <path
            d="M135 128 C122 135, 118 153, 132 162 C142 168, 152 165, 160 166 C168 165, 178 168, 188 162 C202 153, 198 135, 185 128"
            fill="url(#cu-skin-linear)"
            stroke="#BD7B56"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Tip highlight */}
          <ellipse cx="160" cy="144" rx="14" ry="10" fill="#FFF2E6" opacity="0.55" />

          {/* Clearly visible Nostrils (Lubang Hidung) */}
          <path d="M133 156 C134 147, 146 148, 150 157 C146 161, 136 161, 133 156 Z" fill="#6F3824" />
          <path d="M187 156 C186 147, 174 148, 170 157 C174 161, 184 161, 187 156 Z" fill="#6F3824" />

          {/* Philtrum below nose */}
          <path d="M153 172 Q154 185 151 193" fill="none" stroke="#D1906C" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <path d="M167 172 Q166 185 169 193" fill="none" stroke="#D1906C" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

          {/* Flower & scent curls to illustrate smelling flowers */}
          <g transform="translate(226, 130)">
            <path d="M0 36 L0 56" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
            <circle cx="0" cy="14" r="7" fill="#F472B6" />
            <circle cx="11" cy="22" r="7" fill="#F472B6" />
            <circle cx="7" cy="34" r="7" fill="#F472B6" />
            <circle cx="-7" cy="34" r="7" fill="#F472B6" />
            <circle cx="-11" cy="22" r="7" fill="#F472B6" />
            <circle cx="0" cy="24" r="6" fill="#FACC15" />
          </g>
          <path d="M208 118 Q195 104 205 92 Q213 82 198 72" fill="none" stroke="#0284C7" strokeWidth="2.2" strokeDasharray="4 4" strokeLinecap="round" opacity="0.75" />
        </g>
      )}

      {part === 'mouth' && (
        <g>
          {/* Lower face backdrop */}
          <rect x="34" y="32" width="252" height="176" rx="34" fill="url(#cu-skin-radial)" stroke="#DDA482" strokeWidth="1.5" />
          {/* Cheek dimples / smile lines */}
          <path d="M74 100 Q65 124 78 148" fill="none" stroke="#D08E6B" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
          <path d="M246 100 Q255 124 242 148" fill="none" stroke="#D08E6B" strokeWidth="2" strokeLinecap="round" opacity="0.55" />

          {/* Philtrum */}
          <path d="M150 48 Q152 68 148 82" fill="none" stroke="#CE8B67" strokeWidth="2.2" strokeLinecap="round" opacity="0.65" />
          <path d="M170 48 Q168 68 172 82" fill="none" stroke="#CE8B67" strokeWidth="2.2" strokeLinecap="round" opacity="0.65" />

          {/* Mouth interior cavity */}
          <path
            d="M90 116 Q160 110 230 116 Q216 154 160 156 Q104 154 90 116 Z"
            fill="#6B1D24"
          />
          {/* Upper Teeth row */}
          <path
            d="M104 117 Q160 115 216 117 Q208 133 160 134 Q112 133 104 117 Z"
            fill="#FFFFFF"
          />
          {/* Subtle tooth divisions */}
          <path d="M132 117 L132 131 M146 117 L146 132 M160 116 L160 133 M174 117 L174 132 M188 117 L188 131" stroke="#E2E8F0" strokeWidth="1" />
          {/* Tongue */}
          <path d="M126 146 Q160 134 194 146 Q180 156 160 156 Q140 156 126 146 Z" fill="#E36E7A" />

          {/* Upper Lip with Cupid's Bow */}
          <path
            d="M84 116 C106 102, 134 86, 148 86 C155 86, 157 91, 160 91 C163 91, 165 86, 172 86 C186 86, 214 102, 236 116 C210 119, 180 116, 160 117 C140 116, 110 119, 84 116 Z"
            fill="url(#cu-lip-upper)"
            stroke="#9E3A3E"
            strokeWidth="1.6"
          />

          {/* Lower Lip with natural fullness highlight */}
          <path
            d="M86 116 C108 148, 136 168, 160 168 C184 168, 212 148, 234 116 C210 144, 185 152, 160 152 C135 152, 110 144, 86 116 Z"
            fill="url(#cu-lip-lower)"
            stroke="#9E3A3E"
            strokeWidth="1.6"
          />
          <ellipse cx="160" cy="159" rx="22" ry="3.5" fill="#FBC2BE" opacity="0.65" />

          {/* Oral commissures (smile corners) */}
          <path d="M82 114 Q86 117 90 118" stroke="#994D46" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M238 114 Q234 117 230 118" stroke="#994D46" strokeWidth="2.2" strokeLinecap="round" />

          {/* Chin shadow contour */}
          <path d="M134 184 Q160 192 186 184" fill="none" stroke="#CD8A67" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
        </g>
      )}

      {part === 'hands' && (
        <g>
          {/* Left Open Hand (showing all 5 fingers, palm creases, and proportions) */}
          <g transform="translate(12, 8)">
            {/* Wrist */}
            <path d="M62 175 L62 224 L112 224 L110 175 Z" fill="url(#cu-skin-linear)" stroke="#C68460" strokeWidth="1.6" />
            {/* Palm & 5 Fingers */}
            <path
              d="M58 178 C46 164, 42 146, 36 130 C32 120, 42 114, 48 124 L59 144
                 L55 82 C54 70, 67 69, 68 81 L74 128
                 L76 66 C76 54, 89 54, 89 66 L90 125
                 L95 72 C96 60, 109 61, 108 73 L104 128
                 L112 92 C115 81, 127 84, 124 95 L114 148
                 C113 164, 112 174, 108 180 Z"
              fill="url(#cu-skin-radial)"
              stroke="#C68460"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* Palm creases & finger joint lines */}
            <path d="M66 156 Q86 146 104 152" fill="none" stroke="#C5825E" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
            <path d="M72 169 Q90 163 102 169" fill="none" stroke="#C5825E" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <path d="M58 104 L68 104 M78 96 L88 96 M96 100 L106 100 M111 116 L120 118" stroke="#C5825E" strokeWidth="1.3" strokeLinecap="round" opacity="0.65" />
          </g>

          {/* Right Hand (back/dorsal view showing fingernails & holding colored pencil) */}
          <g transform="translate(154, 12)">
            {/* Colored Pencil */}
            <g transform="rotate(-24 68 110)">
              <rect x="64" y="34" width="11" height="122" rx="2" fill="#0284C7" stroke="#0369A1" strokeWidth="1.2" />
              <polygon points="64,34 75,34 69.5,16" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
              <polygon points="67.5,22 71.5,22 69.5,16" fill="#0284C7" />
              <rect x="64" y="150" width="11" height="10" rx="2" fill="#F472B6" />
            </g>

            {/* Wrist */}
            <path d="M44 172 L46 220 L96 220 L94 172 Z" fill="url(#cu-skin-linear)" stroke="#C68460" strokeWidth="1.6" />
            {/* Hand & 5 Fingers with Nails */}
            <path
              d="M44 176 C38 158, 36 138, 37 118
                 L32 82 C31 70, 44 69, 45 81 L51 116
                 L52 60 C52 48, 65 48, 65 60 L66 114
                 L72 64 C73 52, 86 53, 85 65 L81 118
                 L89 82 C92 71, 104 74, 101 85 L94 134
                 C104 128, 114 134, 108 148 C104 162, 98 172, 92 178 Z"
              fill="url(#cu-skin-radial)"
              stroke="#C68460"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* Fingernails (kuku jari) */}
            <rect x="34" y="72" width="7.5" height="9" rx="3.5" fill="url(#cu-nail)" stroke="#D79986" strokeWidth="0.9" />
            <rect x="54.5" y="51" width="8" height="10" rx="3.8" fill="url(#cu-nail)" stroke="#D79986" strokeWidth="0.9" />
            <rect x="74.5" y="55" width="7.5" height="9.5" rx="3.5" fill="url(#cu-nail)" stroke="#D79986" strokeWidth="0.9" />
            <rect x="91.5" y="74" width="7" height="8.5" rx="3.2" fill="url(#cu-nail)" stroke="#D79986" strokeWidth="0.9" />
            {/* Knuckle lines */}
            <path d="M46 122 Q52 119 57 122 M66 120 Q72 117 77 120 M82 124 Q87 121 91 124" fill="none" stroke="#C5825E" strokeWidth="1.4" strokeLinecap="round" opacity="0.65" />
          </g>
        </g>
      )}

      {part === 'legs' && (
        <g>
          {/* Ground shadow */}
          <ellipse cx="160" cy="218" rx="110" ry="12" fill="#CBD5E1" opacity="0.7" />

          {/* Denim Shorts Hem at top */}
          <path d="M98 18 L222 18 L230 56 L168 56 L160 44 L152 56 L90 56 Z" fill="#1E40AF" stroke="#1E3A8A" strokeWidth="1.6" />
          <path d="M92 50 L151 50 M169 50 L228 50" stroke="#93C5FD" strokeWidth="1.4" strokeDasharray="4 3" />

          {/* Left Leg */}
          <g>
            {/* Thigh, Knee, Calf */}
            <path
              d="M100 56 L96 105 C95 116, 97 124, 98 132 L102 182 L132 182 L138 132 C140 124, 141 116, 140 105 L144 56 Z"
              fill="url(#cu-skin-linear)"
              stroke="#C68460"
              strokeWidth="1.7"
            />
            {/* Anatomical Kneecap (Patella) */}
            <ellipse cx="118" cy="112" rx="11" ry="12" fill="#FFE6D3" opacity="0.65" />
            <path d="M110 106 Q118 101 126 106" fill="none" stroke="#C5825E" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M111 120 Q118 124 125 120" fill="none" stroke="#C5825E" strokeWidth="1.6" strokeLinecap="round" />
            {/* Sock */}
            <path d="M102 170 L132 170 L133 190 L101 190 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.4" />
            <path d="M102 175 L132 175" stroke="#0284C7" strokeWidth="2.5" />
            {/* Sneaker */}
            <path d="M98 188 L134 188 L142 206 C142 212, 134 214, 118 214 L92 214 C86 214, 86 204, 92 198 Z" fill="#0284C7" stroke="#075985" strokeWidth="1.6" />
            <path d="M89 208 L141 208 L141 214 L90 214 Z" fill="#FFFFFF" />
            <path d="M112 193 L122 193 M114 198 L124 198" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Right Leg */}
          <g>
            <path
              d="M176 56 L180 105 C179 116, 180 124, 182 132 L188 182 L218 182 L222 132 C223 124, 225 116, 224 105 L220 56 Z"
              fill="url(#cu-skin-linear)"
              stroke="#C68460"
              strokeWidth="1.7"
            />
            {/* Anatomical Kneecap (Patella) */}
            <ellipse cx="202" cy="112" rx="11" ry="12" fill="#FFE6D3" opacity="0.65" />
            <path d="M194 106 Q202 101 210 106" fill="none" stroke="#C5825E" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M195 120 Q202 124 209 120" fill="none" stroke="#C5825E" strokeWidth="1.6" strokeLinecap="round" />
            {/* Sock */}
            <path d="M188 170 L218 170 L219 190 L187 190 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.4" />
            <path d="M188 175 L218 175" stroke="#0284C7" strokeWidth="2.5" />
            {/* Sneaker */}
            <path d="M186 188 L222 188 L228 198 C234 204, 234 214, 228 214 L202 214 C186 214, 178 212, 178 206 Z" fill="#0284C7" stroke="#075985" strokeWidth="1.6" />
            <path d="M179 208 L231 208 L230 214 L179 214 Z" fill="#FFFFFF" />
            <path d="M198 193 L208 193 M196 198 L206 198" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Football beside the legs */}
          <g transform="translate(262, 186)">
            <circle cx="0" cy="0" r="26" fill="#FFFFFF" stroke="#334155" strokeWidth="1.8" />
            <polygon points="0,-10 9,-3 6,8 -6,8 -9,-3" fill="#1E293B" />
            <path d="M0,-10 L0,-25 M9,-3 L23,-9 M6,8 L16,20 M-6,8 L-16,20 M-9,-3 L-23,-9" stroke="#334155" strokeWidth="1.6" />
          </g>
        </g>
      )}
    </svg>
  );
};
