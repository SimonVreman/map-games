import {
  europeanGuardrails,
  guardrailTypes,
} from "@/lib/mapping/countries/guardrails";

const aType = (
  <svg
    width="215"
    height="137"
    viewBox="0 0 215 137"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 45C6 44 2 43 2 43L195.5 1.5C195.5 1.5 199.5 2.5 201 3.5C202.5 4.5 210.5 13.5 212.5 17C214.5 20.5 215 24.5 212.5 27C210 29.5 195.5 39 194 41.5L194 55.5C194 57.5 210.5 73 212.5 76C214.5 79 214.5 83 212.5 85.5C210.5 88 203 93.5 201 94C199 94.5 195.5 95 195.5 95L8.4341 135.12C8.05668 135.309 7.73905 135.44 7.5 135.5C5.5 136 2 136.5 2 136.5L8.4341 135.12C11.2143 133.728 17.2391 129.201 19 127C21 124.5 21 120.5 19 117.5C17 114.5 0.500016 99 0.500013 97L0.5 83C2 80.5 16.5 71 19 68.5C21.5 66 21 62 19 58.5C17 55 9 46 7.5 45Z"
      fill="url(#paint0_linear_3_8)"
    />
    <path
      d="M2 43C2 43 6 44 7.5 45C9 46 17 55 19 58.5C21 62 21.5 66 19 68.5C16.5 71 2 80.5 0.5 83C0.5 85.5 0.500009 95 0.500013 97C0.500016 99 17 114.5 19 117.5C21 120.5 21 124.5 19 127C17 129.5 9.5 135 7.5 135.5C5.5 136 2 136.5 2 136.5L195.5 95C195.5 95 199 94.5 201 94C203 93.5 210.5 88 212.5 85.5C214.5 83 214.5 79 212.5 76C210.5 73 194 57.5 194 55.5L194 41.5C195.5 39 210 29.5 212.5 27C215 24.5 214.5 20.5 212.5 17C210.5 13.5 202.5 4.5 201 3.5C199.5 2.5 195.5 1.5 195.5 1.5L2 43Z"
      stroke="#666666"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3_8"
        x1="83"
        y1="26.5"
        x2="102"
        y2="114.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#999999" />
        <stop offset="0.02" stopColor="#D9D9D9" />
        <stop offset="0.25" stopColor="#D9D9D9" />
        <stop offset="0.33" stopColor="#999999" />
        <stop offset="0.376177" stopColor="#999999" />
        <stop offset="0.44" stopColor="#666666" />
        <stop offset="0.53" stopColor="#999999" />
        <stop offset="0.556907" stopColor="#999999" />
        <stop offset="0.601393" stopColor="#CCCCCC" />
        <stop offset="0.848295" stopColor="#CCCCCC" />
        <stop offset="0.9375" stopColor="#999999" />
      </linearGradient>
    </defs>
  </svg>
);

const bType = (
  <svg
    width="206"
    height="126"
    viewBox="0 0 206 126"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M204.06 2.9125L201.667 1.41711C201.238 1.14904 200.724 1.05344 200.227 1.14955L16.0977 36.7875C15.7415 36.8565 15.6755 37.3378 16 37.5L18.1094 38.9063C18.6658 39.2772 19 39.9017 19 40.5704V64.3957C19 65.3331 18.3489 66.1447 17.4339 66.348L2.56614 69.652C1.65106 69.8553 1 70.6669 1 71.6043V86.2003C1 86.9906 1.46547 87.7069 2.18772 88.0279L17.8123 94.9721C18.5345 95.2931 19 96.0094 19 96.7997V122.651C19 122.865 18.8791 123.06 18.6876 123.156L15.0417 124.979C15.035 124.982 15.0385 124.993 15.0458 124.991L200.731 89.0521C200.909 89.0175 201.083 88.9587 201.245 88.8774L203.894 87.5528C204.572 87.214 205 86.5215 205 85.7639V60.7997C205 60.0094 204.535 59.2931 203.812 58.9721L188.188 52.0279C187.465 51.7069 187 50.9906 187 50.2003V35.6043C187 34.6669 187.651 33.8553 188.566 33.652L203.434 30.348C204.349 30.1447 205 29.3331 205 28.3957V4.6085C205 3.91892 204.645 3.27798 204.06 2.9125Z"
      fill="url(#paint0_linear_1_11)"
      stroke="#666666"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1_11"
        x1="87.8473"
        y1="23.432"
        x2="104"
        y2="108"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D9D9D9" />
        <stop offset="0.03" stopColor="#E6E6E6" />
        <stop offset="0.04" stopColor="#A6A6A6" />
        <stop offset="0.32" stopColor="#A6A6A6" />
        <stop offset="0.34" stopColor="#666666" />
        <stop offset="0.52" stopColor="#666666" />
        <stop offset="0.56" stopColor="#CCCCCC" />
        <stop offset="0.66" stopColor="#CCCCCC" />
        <stop offset="0.68" stopColor="#A6A6A6" />
        <stop offset="0.98" stopColor="#A6A6A6" />
        <stop offset="1" stopColor="#333333" />
      </linearGradient>
    </defs>
  </svg>
);

const bTypeThin = (
  <svg width="206" height="126" viewBox="0 0 206 126" fill="none">
    <path
      d="M203.59 2.61875L202.001 1.62567C201.358 1.22356 200.586 1.08016 199.841 1.22432L16.0977 36.7875C15.7415 36.8565 15.6755 37.3378 16 37.5L17.6641 38.6094C18.4987 39.1658 19 40.1025 19 41.1056V55.8605C19 57.7471 17.2793 59.1654 15.4274 58.8053L4.57261 56.6947C2.7207 56.3346 1 57.7529 1 59.6395V99.1577C1 100.534 1.93689 101.734 3.27239 102.068L16.7276 105.432C18.0631 105.766 19 106.966 19 108.342V122.651C19 122.865 18.8791 123.06 18.6876 123.156L15.0417 124.979C15.035 124.982 15.0385 124.993 15.0458 124.991L200.596 89.0781C200.864 89.0263 201.124 88.9381 201.368 88.8161L203.342 87.8292C204.358 87.321 205 86.2822 205 85.1459V72.3423C205 70.9657 204.063 69.7658 202.728 69.4319L189.272 66.0681C187.937 65.7342 187 64.5343 187 63.1577V29.4729C187 28.0368 188.018 26.8021 189.427 26.528L202.573 23.972C203.982 23.6979 205 22.4632 205 21.0271V5.16274C205 4.12837 204.467 3.16696 203.59 2.61875Z"
      fill="url(#paint0_linear_3_18)"
      stroke="#666666"
    />
    <path
      d="M17.5 60L1 63.5V59C1.16667 58.5 2.4 56.9 4 56.5L17.5 59V60Z"
      fill="url(#paint1_linear_3_18)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3_18"
        x1="87.8473"
        y1="23.432"
        x2="104"
        y2="108"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D9D9D9" />
        <stop offset="0.03" stopColor="#E6E6E6" />
        <stop offset="0.04" stopColor="#A6A6A6" />
        <stop offset="0.23" stopColor="#A6A6A6" />
        <stop offset="0.26" stopColor="#666666" />
        <stop offset="0.41187" stopColor="#8C8C8C" />
        <stop offset="0.68" stopColor="#999999" />
        <stop offset="0.71" stopColor="#CCCCCC" />
        <stop offset="0.78" stopColor="#CCCCCC" />
        <stop offset="0.81" stopColor="#A6A6A6" />
        <stop offset="0.98" stopColor="#A6A6A6" />
        <stop offset="1" stopColor="#333333" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_3_18"
        x1="4"
        y1="56.5"
        x2="5"
        y2="62"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4D4D4D" />
        <stop offset="1" stopColor="#666666" />
      </linearGradient>
    </defs>
  </svg>
);

const doubleTypes = europeanGuardrails
  .filter((v) => v.subjects.length === 2)
  .map((v) => v.subjects.join(","))
  .filter((v, i, a) => a.indexOf(v) === i);

export const svgGuardrailPatterns = (
  <>
    {guardrailTypes.map(({ name }) => (
      <pattern
        key={name + "-base"}
        id={name + "-base"}
        width="215"
        height="137"
        viewBox="0 0 215 137"
        preserveAspectRatio="xMidYMid meet"
        patternUnits="userSpaceOnUse"
      >
        {name === "A-profile"
          ? aType
          : name === "B-profile"
          ? bType
          : bTypeThin}
      </pattern>
    ))}
    {guardrailTypes.map(({ name }) => (
      <pattern
        key={name}
        id={name}
        width="1"
        height="1"
        viewBox="0 0 215 411"
        patternUnits="objectBoundingBox"
        patternContentUnits="userSpaceOnUse"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect
          x="0"
          y="137"
          width="215"
          height="137"
          fill={`url(#${name + "-base"})`}
        />
      </pattern>
    ))}
    {doubleTypes.map((types) => (
      <pattern
        key={types}
        id={types}
        width="1"
        height="1"
        viewBox="0 0 215 548"
        patternUnits="objectBoundingBox"
        patternContentUnits="userSpaceOnUse"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect
          x="0"
          y="137"
          width="215"
          height="137"
          fill={`url(#${types.split(",")[0] + "-base"})`}
        />
        <rect
          x="0"
          y="274"
          width="215"
          height="137"
          fill={`url(#${types.split(",")[1] + "-base"})`}
        />
      </pattern>
    ))}
  </>
);
