import { Dropdown, Menu } from 'antd';
import DropdownWrapper, { DropdownMenus } from './Dropdown.style';
import WithDirection from '@iso/lib/helpers/rtl';

const WDDropdowns = DropdownWrapper(Dropdown);
const Dropdowns = WithDirection(WDDropdowns);

const WDDropdownButtons = DropdownWrapper(Dropdown.Button);
const DropdownButtons = WithDirection(WDDropdownButtons);
const DropdownMenu = DropdownMenus(Menu);

export default Dropdowns;
export { DropdownButtons, DropdownMenu };
