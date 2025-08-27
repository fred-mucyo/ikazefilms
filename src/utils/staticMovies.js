// Lightweight, on-site fallback movies rendered instantly while the backend loads
// Keep this list small to ensure fast initial paint

const staticMovies = [
  {
    id: 's1',
    title: 'Mission Impossible Final C',
    description: 'Mission Impossiple Final Reckoning',
    interpreter_name: 'Rocky',
    created_at: '2024-01-01T00:00:00.000Z',
    is_popular: true,
    is_featured: true,
    thumbnail_url: '/mission.jpg',
    poster_url: '/mission.jpg',
    image_url: '/mission.jpg',
    backdrop_url: '/mission.jpg',
    video_url: 'https://hglink.to/e/jq1d6h5ex04z ',
    youtube_trailer_url: 'https://youtu.be/fsQgc9pCyDU?si=DlJw5WMC7Ll-hCfN'
  },
  {
    id: 's2',
    title: 'The working man',
    description: 'Best movie ever.',
    interpreter_name: 'Rocky',
    created_at: '2024-02-12T00:00:00.000Z',
    is_popular: true,
    thumbnail_url: '/workingman.jpeg',
    poster_url: '/workingman.jpeg',
    image_url: '/workingman.jpeg',
    video_url: 'https://hglink.to/lodwr6jn1tbp',
    youtube_trailer_url: 'https://youtu.be/zTbgNC42Ops?si=uZ5EnXsdOGrWA98H'
  },
  {
    id: 's3',
    title: 'JAAT',
    description: 'A fresh indian movie.',
    interpreter_name: 'Rocky',
    created_at: '2024-03-20T00:00:00.000Z',
    is_featured: true,
    thumbnail_url: '/jaat.jpg',
    poster_url: '/jaat.jpg',
    image_url: '/jaat.jpg',
    video_url: 'https://hglink.to/957165f3cx4s',
    youtube_trailer_url: 'https://youtu.be/-I5kX9b9rGc?si=xCeJqxK9vCsOJ8nG'
  },
  {
    id: 's4',
    title: 'Furiosa  A Mad Max Saga',
    description: 'Best movie ever.',
    interpreter_name: 'Rocky',
    created_at: '2024-04-05T00:00:00.000Z',
    is_popular: true,
    thumbnail_url: '/furioswa.jpg',
    poster_url: '/furioswa.jpg',
    image_url: '/furioswa.jpg',
    video_url: 'https://hglink.to/tytkmbs5t5ot',
    youtube_trailer_url: 'https://youtu.be/XJMuhwVlca4?si=3lpPzFFqAsrm_H62'
  },
  {
    id: 's5',
    title: 'Mission Impossible dead reckoning B',
    description: 'Mission Impossible',
    interpreter_name: 'Rocky',
    created_at: '2024-05-15T00:00:00.000Z',
    thumbnail_url: '/missionB.jpg',
    poster_url: '/missionB.jpg',
    image_url: '/missionB.jpg',
    video_url: 'https://hglink.to/e/qrn2xt5oxp8i',
    youtube_trailer_url: 'https://youtu.be/avz06PDqDbM?si=0LqnWR0Snl-IljZR'
  },
  {
    id: 's6',
    title: 'The Covenant War',
    description: 'High-energy picks to kick things off.',
    interpreter_name: 'Action',
    created_at: '2024-06-10T00:00:00.000Z',
    thumbnail_url: '/covenant.jpg',
    poster_url: '/covenant.jpg',
    image_url: '/covenant.jpg',
    video_url: 'https://hglink.to/e/or3y91d8atrf',
    youtube_trailer_url: 'https://youtu.be/02PPMPArNEQ?si=awfiGxqIj_X4lr3T'
  },
  {
    id: 's7',
    title: 'Fast and fury 12 hours',
    description: 'Light-hearted laughs while you wait.',
    interpreter_name: 'Rocky',
    created_at: '2024-07-22T00:00:00.000Z',
    thumbnail_url: '/fury12.jpg',
    poster_url: '/fury12.jpg',
    image_url: '/fury12.jpg',
    video_url: 'https://hglink.to/qtkx1utmna8i',
    youtube_trailer_url: 'https://youtu.be/0ax2NfdJEkM?si=ogTA1JvzLHBObNGB'
  },
  {
    id: 's8',
    title: '24 hours to live',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'Rocky',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/24hours.jpg',
    poster_url: '/24hours.jpg',
    image_url: '/24hours.jpg',
    video_url: 'https://hglink.to/tykqxwd3nkex',
    youtube_trailer_url: 'https://www.youtube.com/watch?v=oHg5SJYRHA0'
  },


    {
    id: 's9',
    title: 'warhorse one',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'Dylan',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/war1.jpeg',
    poster_url: '/war1.jpeg',
    image_url: '/war1.jpeg',
    video_url: 'https://hglink.to/e/o1whn7yf520u',
    youtube_trailer_url: 'https://www.youtube.com/watch?v=oHg5SJYRHA0'
  },

  {
    id: 's10',
    title: 'AMBULANCE',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'JUNIOR GITI',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/ambulance.jpg',
    poster_url: '/ambulance.jpg',
    image_url: '/ambulance.jpg',
    video_url: 'https://hglink.to/wjfr5u3kuy79',
    youtube_trailer_url: 'https://youtu.be/7NU-STboFeI?si=tWC4ghQba7s7M1Rq'
  },

   {
    id: 's11',
    title: 'Fistful of Vengeance',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'JUNIOR GITI',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/fist.jpg',
    poster_url: '/fist.jpg',
    image_url: '/fist.jpg',
    video_url: 'https://hglink.to/yb285kh53amw',
    youtube_trailer_url: 'https://youtu.be/vC_n_L1KGbo?si=Fm_576pmU5aB91UD'
  },

  {
    id: 's12',
    title: 'Johnny English 1 ',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'JUNIOR GITI',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/johnny1.jpg',
    poster_url: '/johnny1.jpg',
    image_url: '/johnny1.jpg',
    video_url: 'https://hglink.to/moysnstxma15',
    youtube_trailer_url: 'https://youtu.be/lFmFwCRLsK4?si=MWchYGR9XVlBxamL'
  },

  {
    id: 's13',
    title: 'Plane',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'JUNIOR GITI',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/plane.jpg',
    poster_url: '/plane.jpg',
    image_url: '/plane.jpg',
    video_url: 'https://hglink.to/zajv6d0nrsn2',
    youtube_trailer_url: 'https://youtu.be/M25zXBIUVr0?si=GG-jaVYZqVpyXSfd'
  },

  {
    id: 's14',
    title: 'The Witch',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'JUNIOR GITI',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/witch.jpg',
    poster_url: '/witch.jpg',
    image_url: '/witch.jpg',
    video_url: 'https://hglink.to/iezkuuwli02v',
    youtube_trailer_url: 'https://youtu.be/eYJuGhT5nYs?si=rv3MS8sjTTeio2U8'
  },



];

export default staticMovies;


