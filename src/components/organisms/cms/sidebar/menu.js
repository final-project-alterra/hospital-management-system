export const adminMenu = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    url: '/',
    icon: 'HomeOutlined',
  },
  {
    key: 'data',
    label: 'Manage Data',
    url: '/admin/data',
    icon: 'UnorderedListOutlined',
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
      {
        key: 'data-nurse',
        label: 'Nurse',
        url: '/admin/data/nurse',
        icon: '',
      },
      {
        key: 'data-utils',
        label: 'Utils',
        url: '/admin/data/utils',
        icon: '',
      },
    ],
  },
  {
    key: 'outpatient',
    label: 'Manage Outpatient',
    url: '/admin/outpatient',
    icon: 'FormOutlined',
  },
  {
    key: 'schedule',
    label: 'Manage Schedule',
    url: '/admin/schedule',
    icon: 'ScheduleOutlined',
  },
];

export const doctorMenu = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    url: '/doctor/dashboard',
    icon: 'HomeOutlined',
  },
  {
    key: 'schedule',
    label: 'Schedule',
    url: '/doctor/schedule',
    icon: 'ScheduleOutlined',
  },
]

export const nurseMenu = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    url: '/nurse/dashboard',
    icon: 'HomeOutlined',
  },
  {
    key: 'schedule',
    label: 'Schedule',
    url: '/nurse/schedule',
    icon: 'ScheduleOutlined',
  },
]