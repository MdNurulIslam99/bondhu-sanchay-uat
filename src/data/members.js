// Real member list (from the member sheet). Mobile numbers are private:
// show them only through `maskPhone` on public pages.
export const members = [
  { id: 'm01', sl: 1, name: 'Md Sadekur Rahaman Pias', phone: '01617850226' },
  { id: 'm02', sl: 2, name: 'Md Nurul Islam', phone: '01634064799' },
  { id: 'm03', sl: 3, name: 'Mukto', phone: '01981144965' },
  { id: 'm04', sl: 4, name: 'Shuvo', phone: '01945616750' },
  { id: 'm05', sl: 5, name: 'Md Mostafizur Rahman', phone: '01956231450' },
  { id: 'm06', sl: 6, name: 'Md Zubaer Al Mahmud Rabby', phone: '01883483398' },
  { id: 'm07', sl: 7, name: 'Md Sadikur Rahman Sadik', phone: '01684399623' },
  { id: 'm08', sl: 8, name: 'M Ragib Al Sharier Mahfuj', phone: '01516503646' },
  { id: 'm09', sl: 9, name: 'Md Shafiur Rahman', phone: '01987468655' },
  { id: 'm10', sl: 10, name: 'Istiak Riad', phone: '01962147161' },
  { id: 'm11', sl: 11, name: 'Mahedi Hasan Opu', phone: '01797408016' },
];

export const maskPhone = (p) => p.slice(0, 4) + '•••' + p.slice(-4);
export const initials = (name) =>
  name
    .split(' ')
    .filter((w) => !/^(md|m)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
