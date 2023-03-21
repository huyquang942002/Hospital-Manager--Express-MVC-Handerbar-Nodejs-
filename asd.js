const reception = [
    {
      name: '13',
      age: '3',
      sick: 'Chấn thương sọ não',
      priority: 1,
      specialist: 'Chấn thương',
      date: '3/19/2023, 4:48:34 PM',
      insurance: '1412'
    },
    {
      name: '1',
      age: '1',
      sick: 'Cảm xoàn',
      priority: 20,
      specialist: 'Tai mũi họng',
      date: '3/20/2023, 3:54:37 PM',
      insurance: '12'
    },
    {
      name: '1',
      age: '1',
      sick: 'Cảm xoàn',
      priority: 20,
      specialist: 'Tai mũi họng',
      date: '3/19/2023, 4:30:26 PM',
      insurance: '12121'
    }
  ];
  
  const doctor = [
    { name: 'Trung', slot: 2, currentSlot: 0, specialist: 'Chấn thương' },
    { name: 'Tâm', slot: 2, currentSlot: 0, specialist: 'Chấn thương' },
    { name: 'Lý', slot: 3, currentSlot: 0, specialist: 'Tai mũi họng' },
    { name: 'Hải', slot: 4, currentSlot: 0, specialist: 'Tai mũi họng' },
    { name: 'Trường', slot: 3, currentSlot: 0, specialist: 'Mắt' },
    { name: 'Minh', slot: 2, currentSlot: 0, specialist: 'Mắt' },
    { name: 'Nhân', slot: 4, currentSlot: 0, specialist: 'Tim mạch' },
    { name: 'Long', slot: 2, currentSlot: 0, specialist: 'Tim mạch' }
  ];

 let a = reception.map((item)=>item.specialist)

 console.log(a);

  


// doctor.filter((doc)=>doc.specialist===a.specialist)
  