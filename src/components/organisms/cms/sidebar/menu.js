export const adminMenu = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    url: '/',
    icon: 'table',
  },
  {
    key: 'data',
    label: 'Manage Data',
    url: '/admin/data',
    icon: 'unordered-list',
    children: [
      {
        key: 'data-doctor',
        label: 'Doctor',
        url: '/admin/data/doctor',
        icon: '',
      },
      {
        key: 'data-patient',
        label: 'Patient',
        url: '/admin/data/patient',
        icon: '',
      },
      {
        key: 'data-admin',
        label: 'Admin',
        url: '/admin/data/admin',
        icon: '',
      },
    ],
  },
  {
    key: 'outpatient',
    label: 'Manage Outpatient',
    url: '/admin/outpatient',
    icon: 'table',
  },
];