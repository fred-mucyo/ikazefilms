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
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/witch.jpg',
    poster_url: '/witch.jpg',
    image_url: '/witch.jpg',
    video_url: 'https://hglink.to/iezkuuwli02v',
    youtube_trailer_url: 'https://youtu.be/eYJuGhT5nYs?si=rv3MS8sjTTeio2U8'
  },
 
  {
    id: 's15',
    title: 'Home Sweet Home  Rebirth',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/rebirth.jpg',
    poster_url: '/rebirth.jpg',
    image_url: '/rebirth.jpg',
    video_url: 'https://hglink.to/2fd9cqf8j3gb',
    youtube_trailer_url: 'https://youtu.be/8pYI0jNXSqI?si=9EAZCFVSgCCYt9-H'
  },

  {
    id: 's16',
    title: 'It Feeds',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/feeds.jpg',
    poster_url: '/feeds.jpg',
    image_url: '/feeds.jpg',
    video_url: 'https://hglink.to/u52sqxbn4c6s',
    youtube_trailer_url: 'https://youtu.be/spLyHdJ_SyE?si=y2uXavrrlW0lahJX'
  },

  {
    id: 's17',
    title: 'Fury 12 Hours',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/fury.jpg',
    poster_url: '/fury.jpg',
    image_url: '/fury.jpg',
    video_url: 'https://hglink.to/qtkx1utmna8i',
    youtube_trailer_url: 'https://youtu.be/mKJucnucZ5M?si=siqRGFtjODlNIKNj'
  },

  {
    id: 's18',
    title: 'Brick',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/brick.jpg',
    poster_url: '/brick.jpg',
    image_url: '/brick.jpg',
    video_url: 'https://hglink.to/14npq1esngdz',
    youtube_trailer_url: 'https://youtu.be/fmi4Qc-cvis?si=cUmQCWK03FDPx5gh'
  },

  {
    id: 's19',
    title: 'Brick',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/amaran.jpg',
    poster_url: '/amaran.jpg',
    image_url: '/amaran.jpg',
    video_url: 'https://hglink.to/5p6ev2oofvb7',
    youtube_trailer_url: 'https://youtu.be/H7FT-d4YA74?si=NK1PR0znQe1Vqbbl'
  },

  {
    id: 's20',
    title: '24 Hours to Live',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/hours.jpg',
    poster_url: '/hours.jpg',
    image_url: '/hours.jpg',
    video_url: 'https://hglink.to/tykqxwd3nkex',
    youtube_trailer_url: 'https://youtu.be/PfeQX80tjdQ?si=Wx5vcKWtXwzP50PE'
  },

  {
    id: 's21',
    title: 'Havoc',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/havoc.jpg',
    poster_url: '/havoc.jpg',
    image_url: '/havoc.jpg',
    video_url: 'https://hglink.to/59qmk7lvvudb',
    youtube_trailer_url: 'https://youtu.be/6txjTWLoSc8?si=8lOGzv-bjEhGaZKj'
  },

  {
    id: 's22',
    title: 'Flight Risk',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/flight.jpg',
    poster_url: '/flight.jpg',
    image_url: '/flight.jpg',
    video_url: 'https://hglink.to/nnnp8f4kxw77',
    youtube_trailer_url: 'https://youtu.be/ojC9JBuccJA?si=reaoMi-xOdiljl6O'
  },

   {
    id: 's23',
    title: 'Drop',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/drop.jpg',
    poster_url: '/drop.jpg',
    image_url: '/drop.jpg',
    video_url: 'https://hglink.to/fej9udmslz7c',
    youtube_trailer_url: 'https://youtu.be/bs_nFwh5eJw?si=BWa344KQD4NfkkbN'
  },

  {
    id: 's24',
    title: 'Contraataque',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'SANKARA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/contra.jpg',
    poster_url: '/contra.jpg',
    image_url: '/contra.jpg',
    video_url: 'https://hglink.to/8updb5fyevyd',
    youtube_trailer_url: 'https://youtu.be/bs_nFwh5eJw?si=BWa344KQD4NfkkbN'
  },

  {
    id: 's25',
    title: 'In the Lost Lands',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/lands.jpg',
    poster_url: '/lands.jpg',
    image_url: '/lands.jpg',
    video_url: 'https://hglink.to/swng2v5cifeq',
    youtube_trailer_url: 'https://youtu.be/b9UC1szqE_k?si=n94iJZQ5qKtv-cjt'
  },

  {
    id: 's26',
    title: 'iHostage',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/hostage.jpg',
    poster_url: '/hostage.jpg',
    image_url: '/hostage.jpg',
    video_url: 'https://hglink.to/cbisitgp04k1',
    youtube_trailer_url: 'https://youtu.be/Dhg-3ME2L6M?si=g0O_PRwMC4-PCcb4'
  },

  {
    id: 's27',
    title: 'Kill',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/kill.jpg',
    poster_url: '/kill.jpg',
    image_url: '/kill.jpg',
    video_url: 'https://hglink.to/4vjfnwcj5qrb',
    youtube_trailer_url: 'https://youtu.be/da7lKeeS67c?si=anUYA55Qle_gzY9K'
  },

  {
    id: 's28',
    title: 'Kill Boksoon ',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/bookson.jpg',
    poster_url: '/bookson.jpg',
    image_url: '/bookson.jpg',
    video_url: 'https://hglink.to/o40pp6blwumk',
    youtube_trailer_url: 'https://youtu.be/70e5RjgkHjU?si=iY4Q82MkCozjPxyJ'
  },

  {
    id: 's29',
    title: 'Last Breath',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/breaath.jpg',
    poster_url: '/breaath.jpg',
    image_url: '/breaath.jpg',
    video_url: 'https://hglink.to/0tvgocbbfbe0',
    youtube_trailer_url: 'https://youtu.be/sNMyooXZZTM?si=AGLKFvTwd-NhB9ZZ'
  },

  {
    id: 's30',
    title: 'The last bullet',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/bullet.jpg',
    poster_url: '/bullet.jpg',
    image_url: '/bullet.jpg',
    video_url: 'https://hglink.to/3677ycukjem8',
    youtube_trailer_url: 'https://youtu.be/r2u9GifyDg0?si=tapaissLZN1EcHEZ'
  },

  {
    id: 's31',
    title: 'No Way Up',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/way.jpg',
    poster_url: '/way.jpg',
    image_url: '/way.jpg',
    video_url: 'https://hglink.to/3677ycukjem8',
    youtube_trailer_url: 'https://youtu.be/r2u9GifyDg0?si=tapaissLZN1EcHEZ'
  },

  {
    id: 's32',
    title: 'Rosario',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/rosario.jpg',
    poster_url: '/rosario.jpg',
    image_url: '/rosario.jpg',
    video_url: 'https://hglink.to/mjfo2i1174pj',
    youtube_trailer_url: 'https://youtu.be/ksM0rCILPqg?si=b6FzPdugC8wGo9YK'
  },

  {
    id: 's33',
    title: 'Snow White',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/snowwhite.jpg',
    poster_url: '/snowwhite.jpg',
    image_url: '/snowwhite.jpg',
    video_url: 'https://hglink.to/57c3bxak6jhb',
    youtube_trailer_url: 'https://youtu.be/iV46TJKL8cU?si=5XEjDTmstb2It3wh'
  },

  {
    id: 's34',
    title: 'The Diplomat',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/diplomat.jpg',
    poster_url: '/diplomat.jpg',
    image_url: '/diplomat.jpg',
    video_url: 'https://hglink.to/wc4f6yaq35hu',
    youtube_trailer_url: 'https://youtu.be/lV6sJlBbhPs?si=b2bRkM9D-rfNibxO'
  },

  {
    id: 's35',
    title: 'The Gorge',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/gorge.jpg',
    poster_url: '/gorge.jpg',
    image_url: '/gorge.jpg',
    video_url: 'https://hglink.to/zwr60nahxn56',
    youtube_trailer_url: 'https://youtu.be/rUSdnuOLebE?si=ydb_tWjpJrdhk3sk'
  },

  {
    id: 's36',
    title: 'Heart of Stone',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'ROCKY',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/stone.jpg',
    poster_url: '/stone.jpg',
    image_url: '/stone.jpg',
    video_url: 'https://hglink.to/7bo47bpg8at6',
    youtube_trailer_url: 'https://youtu.be/XuDwndGaCFo?si=FJOmOboNS4DFmIXZ'
  },

  {
    id: 's37',
    title: 'The Last Supper',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/supper.jpg',
    poster_url: '/supper.jpg',
    image_url: '/supper.jpg',
    video_url: 'https://hglink.to/1mrj3guot1u6',
    youtube_trailer_url: 'https://youtu.be/-jwAbai7k0s?si=U_WgZ6lOSahgIDO-'
  },

  {
    id: 's38',
    title: 'Tuhog',
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/tuhog.jpg',
    poster_url: '/tuhog.jpg',
    image_url: '/tuhog.jpg',
    video_url: 'https://hglink.to/6au3k0l3xaic',
    youtube_trailer_url: 'https://youtu.be/C0BvkC3fQUo?si=B3V83KaExv1Hpk67'
  },

  {
    id: 's39',
    title: "Tyler Perry's Duplicity",
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/perry.jpg',
    poster_url: '/perry.jpg',
    image_url: '/perry.jpg',
    video_url: 'https://hglink.to/afq3dd7hvvdq',
    youtube_trailer_url: 'https://youtu.be/i6NvYfJwq-U?si=mn-V-63smz0SOWT3'
  },

  {
    id: 's40',
    title: "Until Dawn",
    description: 'Gripping stories at a glance.',
    interpreter_name: 'GAHEZA',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/down.jpg',
    poster_url: '/down.jpg',
    image_url: '/down.jpg',
    video_url: 'https://hglink.to/hsmj62und74o',
    youtube_trailer_url: 'https://youtu.be/2b3vBaINZ7w?si=vceZHfd4fMU9H31s'
  },

  {
    id: 's41',
    title: "Heads of State",
    description: 'Gripping stories at a glance.',
    interpreter_name: 'ROCKY',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/heads.jpg',
    poster_url: '/heads.jpg',
    image_url: '/heads.jpg',
    video_url: 'https://hglink.to/i6331zcdqx8n',
    youtube_trailer_url: 'https://youtu.be/8J646zM7UM8?si=MY1ow4m7_YBZg_GY'
  },

  {
    id: 's42',
    title: "Freelance",
    description: 'Gripping stories at a glance.',
    interpreter_name: 'ROCKY',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/freelance.jpg',
    poster_url: '/freelance.jpg',
    image_url: '/freelance.jpg',
    video_url: 'https://hglink.to/w0j6vqkumxmt',
    youtube_trailer_url: 'https://youtu.be/BrqWlOzm2Iw?si=_nIDXuJZWRrOZDvS'
  },

  {
    id: 's43',
    title: "Fateh",
    description: 'Gripping stories at a glance.',
    interpreter_name: 'ROCKY',
    created_at: '2024-08-30T00:00:00.000Z',
    thumbnail_url: '/fateh.jpg',
    poster_url: '/fateh.jpg',
    image_url: '/fateh.jpg',
    video_url: 'https://hglink.to/t8t9ddsgp1t2',
    youtube_trailer_url: 'https://youtu.be/5efGUAV9Vv8?si=V-Z8ZacXpiSBUYr3'
  },


];

export default staticMovies;


