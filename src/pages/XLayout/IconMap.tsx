import Icon5 from 'react-native-vector-icons/FontAwesome5';

export const activeColor = 'rgb(238, 119, 238)';
export const defaultColor = 'rgb(45, 45, 45)';

export default function makeIcon(key: any, focused: boolean, color: any) {
  const c = focused ? activeColor : defaultColor;
  switch (key) {
    case 'Friend':
      return <Icon5 name="feather-alt" size={18} color={c} />;
    case 'Group':
      return <Icon5 name="layer-group" size={18} color={c} />;
    case 'Message':
      return <Icon5 name="comment" size={18} color={c} />;
    case 'My':
      return <Icon5 name="user-alt" size={18} color={c} />;
  }
}
