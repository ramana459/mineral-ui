import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import { createTheme, mineralTheme } from '../../../../themes';
import Heading from '../../Heading';

import GuidelinePage from '../../GuidelinePage';
import { createStyledComponent } from '../../../../styles';
import Sidebar from './Sidebar';
import Demo from './Demo';

type Props = {
  pageMeta: {
    title: string,
    canonicalLink: string
  }
};

const duration = 350;
const mobileBreakpoint = '@media(max-width: 45em)';

const styles = {
  leftColumn: ({ theme }) => ({
    marginRight: theme.space_inline_md,
    [mobileBreakpoint]: {
      marginRight: 0
    }
  }),
  rightColumn: {
    width: '20em',
    minWidth: '20em',
    [mobileBreakpoint]: {
      display: 'none'
    }
  },
  lede: ({ theme }) => ({
    fontSize: theme.fontSize_h3,
    marginBottom: theme.space_stack_xxl
  }),
  mobileSticky: {
    display: 'none',
    position: 'absolute',
    left: 0,
    right: 0,
    [mobileBreakpoint]: {
      display: 'block'
    }
  },
  paragraph: ({ theme }) => ({
    margin: `${theme.space_stack_xxl} 0 !important`
  }),
  root: {
    display: 'flex'
  }
};

const Root = createStyledComponent(StickyContainer, styles.root);
const Lede = createStyledComponent('p', styles.lede);
const MobileSticky = createStyledComponent('div', styles.mobileSticky);
const LeftColumn = createStyledComponent(GuidelinePage, styles.leftColumn);
const RightColumn = createStyledComponent('div', styles.rightColumn);

export default class PaletteDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { theme: mineralTheme, oldTheme: mineralTheme };
  }

  props: Props;

  handleThemeChange = color => {
    const newTheme = createTheme(color);
    this.setState(prevState => {
      return { oldTheme: { ...prevState.theme }, theme: newTheme };
    });
    setTimeout(() => {
      this.setState({ oldTheme: newTheme });
    }, duration * 2);
  };

  render() {
    const { oldTheme, theme } = this.state;

    return (
      <Root>
        <LeftColumn {...this.props}>
          <Heading level={1}>Palette Picker</Heading>
          <Lede>
            Mineral UI themes are composed of a main color ramp and the base
            gray ramp. Every theme uses the base gray ramp. Choose from the main
            theme colors on the right to see how components are affected.
          </Lede>
          <MobileSticky>
            <Sticky topOffset={330}>
              {({ style }) => {
                return (
                  <Sidebar
                    style={style}
                    theme={theme}
                    changeTheme={this.handleThemeChange}
                  />
                );
              }}
            </Sticky>
          </MobileSticky>
          <Demo oldTheme={oldTheme} newTheme={theme} />
        </LeftColumn>
        <RightColumn>
          <Sticky>
            {({ style }) => {
              return (
                <Sidebar
                  style={style}
                  theme={theme}
                  changeTheme={this.handleThemeChange}
                />
              );
            }}
          </Sticky>
        </RightColumn>
      </Root>
    );
  }
}
