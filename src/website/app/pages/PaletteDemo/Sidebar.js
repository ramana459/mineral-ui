import React from 'react';
import { createStyledComponent } from '../../../../styles';
import Paragraph from '../../Paragraph';
import ColorRamp from './ColorRamp';
import Picker from './Picker';

type Props = {
  changeTheme: () => {},
  style: Object,
  theme: Object
};

const mobileBreakpoint = '@media(max-width: 45em)';

const styles = {
  description: {
    [mobileBreakpoint]: {
      display: 'none'
    }
  },
  root: ({ theme }) => ({
    backgroundColor: 'white',
    padding: `${theme.space_inset_md} ${theme.space_inset_md} 0`,
    zIndex: theme.zIndex_200
  }),
  theme: {
    display: 'flex',
    '& div': {
      width: '50%',
      position: 'relative'
    },
    [mobileBreakpoint]: {
      display: 'none'
    }
  }
};

const Root = createStyledComponent('div', styles.root);
const Description = createStyledComponent(Paragraph, styles.description);
const Theme = createStyledComponent('div', styles.theme);

const PRIMARY_REGEX = /^color_theme/;
const GRAY_REGEX = /^color_gray/;

// react-sticky breaks if this is a functional component
export default class Sidebar extends React.Component {
  props: Props;

  render() {
    const { changeTheme, style, theme } = this.props;

    const primaries = Object.entries(theme).reduce((accum, [key, value]) => {
      if (PRIMARY_REGEX.test(key)) {
        accum[key] = value;
      }
      return accum;
    }, {});
    const grays = Object.entries(theme).reduce((accum, [key, value]) => {
      if (GRAY_REGEX.test(key)) {
        accum[key] = value;
      }
      return accum;
    }, {});

    return (
      <Root style={style} key="sidebar">
        <Picker changeTheme={changeTheme} />
        <Description>
          A theme is composed of a hue color ramp and the base gray ramp. Every
          theme uses the base gray ramp.
        </Description>
        <Theme>
          <ColorRamp ramp={primaries} />
          <ColorRamp ramp={grays} isGray={true} />
        </Theme>
      </Root>
    );
  }
}
