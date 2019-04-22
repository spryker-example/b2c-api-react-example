import * as React from 'react';

/* tslint:disable */

const LockIconPath = 'M1.393 15.612h10.214V7.748H1.393v7.864zM3.018 4.903c0-1.942 1.555-3.515 3.482-3.515 1.927 0 3.482 1.573 3.482 3.515v1.458H3.018V4.903zM1.393 17h10.214c.766 0 1.393-.624 1.393-1.388V7.748c0-.763-.627-1.387-1.393-1.387h-.232V4.903C11.375 2.197 9.193 0 6.5 0S1.625 2.197 1.625 4.903v1.458h-.232C.627 6.36 0 6.985 0 7.748v7.864C0 16.376.627 17 1.393 17zm4.41-3.238h1.393v-2.776H5.804v2.776z';

const EditIconPath = 'M11.934.198a.603.603 0 0 0-.356.173l-10.4 10.272a.59.59 0 0 0-.162.284l-1 4.346a.6.6 0 0 0 .16.551.617.617 0 0 0 .558.158l4.4-.987a.602.602 0 0 0 .294-.16l10.4-10.272a.61.61 0 0 0 0-.834l-3.4-3.358a.604.604 0 0 0-.494-.173zM12 1.628l2.552 2.52-1.152 1.14-2.548-2.523L12 1.628zm-2 1.975l2.552 2.52L5.2 13.387l-2.548-2.523L10 3.603zm-7.98 8.314l2.12 2.092-2.74.608.62-2.7z';

/* tslint:enable */
export const LockIcon: React.SFC = () => (
    <svg viewBox="0 0 13 17">
        <path fillRule="evenodd" d={ LockIconPath }/>
    </svg>
);

export const EditIcon: React.SFC = () => (
    <svg viewBox="0 0 16 16">
        <path fillRule="nonzero" d={ EditIconPath }/>
    </svg>
);
