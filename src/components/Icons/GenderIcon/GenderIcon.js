import React from 'react';
import ReactSVG from 'react-svg';

import styles from './GenderIcon.less';




export default ({gender, width = 60, selected}) => {

  const Man = (<svg className={selected && styles.male} width={`${width}px`} viewBox="0 0 34 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <defs></defs>
    <g id="Icons-FUNNEL-ATTRACTION" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(-510.000000, -596.000000)">
      <g id="ic-man" transform="translate(510.000000, 596.000000)" fill="#999999">
        <g id="Group-12">
          <path d="M9.09331013,6 C10.8327243,6 11.5383213,7.4322298 11.8018134,8.22171025 L13.9387556,15.2403989 C14.3649839,16.7501125 12.4429877,17.3751687 11.9847007,15.9038919 L10.0617886,9.45962048 L9.50213505,9.45962048 L9.76440586,20.9229498 L9.76440586,29.8598197 C9.76440586,31.3838709 7.47022327,31.3762445 7.47022327,29.8598197 L7.47022327,20.8643794 L6.53502481,20.8643794 L6.53655141,29.8473125 C6.53655141,31.3838709 4.23290388,31.3838709 4.23290388,29.8473125 L4.23229323,20.9229498 L4.45884147,9.45962048 L3.94162757,9.45962048 L2.01841009,15.926771 C1.56042848,17.3364268 -0.378360372,16.7577388 0.0655764765,15.2471101 L2.20068678,8.22171025 C2.42937227,7.42094279 3.13038946,6 4.88598566,6 L9.09331013,6 Z" id="Shape-Copy" fillRule="nonzero"></path>
          <circle id="Oval-Copy" fillRule="nonzero" cx="6.5" cy="2.5" r="2.5"></circle>
        </g>
      </g>
    </g>
  </svg>);

  const Woman = (<svg className={selected && styles.female} width={`${width}px`} viewBox="0 0 34 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <defs></defs>
    <g id="Icons-FUNNEL-ATTRACTION" stroke="none" strokeWidth="1" fill="black" fillRule="evenodd" transform="translate(-702.000000, -596.000000)">
      <g id="ic-woman" transform="translate(702.000000, 596.000000)" fill="#999999">
        <g id="Group-12">
          <path
            d="M9.09331013,6 C10.8327243,6 11.5383213,7.4322298 11.8018134,8.22171025 L13.9387556,15.2403989 C14.3649839,16.7501125 12.4429877,17.3751687 11.9847007,15.9038919 L10.0617886,9.45962048 L9.50213505,9.45962048 L12.8350199,20.9229498 L9.76440586,20.9229498 L9.76440586,29.8598197 C9.76440586,31.3838709 7.47022327,31.3762445 7.47022327,29.8598197 L7.47022327,20.8643794 L6.53502481,20.8643794 L6.53655141,29.8473125 C6.53655141,31.3838709 4.23290388,31.3838709 4.23290388,29.8473125 L4.23229323,20.9229498 L1.15190887,20.9229498 L4.45884147,9.45962048 L3.94162757,9.45962048 L2.01841009,15.926771 C1.56042848,17.3364268 -0.378360372,16.7577388 0.0655764765,15.2471101 L2.20068678,8.22171025 C2.42937227,7.42094279 3.13038946,6 4.88598566,6 L9.09331013,6 Z"
            id="Shape" fillRule="nonzero"></path>
          <circle id="Oval" fillRule="nonzero" cx="6.5" cy="2.5" r="2.5"></circle>
        </g>
      </g>
    </g>
  </svg>);

  return (gender === 'male') ? Man : Woman;
};
