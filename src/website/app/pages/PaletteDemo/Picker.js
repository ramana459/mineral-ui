import React from 'react';
import { readableColor } from 'polished';
import { Transition } from 'react-transition-group';
import { createStyledComponent } from '../../../../styles';
import color from '../../../../colors';
import IconKeyboardArrowDown from '../../../../Icon/IconKeyboardArrowDown';
import Heading from '../../Heading';
import Paragraph from '../../Paragraph';

type FadeProps = {
  activeColor: string,
  colorName: string,
  handleColorChange: () => {},
  readable: string,
  in: boolean
};

type GrowProps = {
  in: boolean,
  children: React$Node
};

const mobileBreakpoint = '@media(max-width: 45em)';
const duration = 350;
const quintOut = 'cubic-bezier(0.23, 1, 0.32, 1)';
const easeOutBack = `cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
const availableThemes = [
  'purple',
  'indigo',
  'blue',
  'sky',
  'teal',
  'lime',
  'slate',
  'dusk'
];

const styles = {
  collapseIcon: ({ theme, collapsed }) => ({
    cursor: 'pointer',
    position: 'absolute',
    right: 0,
    top: `-${theme.space_stack_md}`,
    transition: `transform ${duration}ms ${quintOut}`,
    transform: collapsed ? 'rotate(180deg)' : 'rotate(0)'
  }),

  // this object isn't consumed by glamorous,
  // so we inline the border color as a literal
  grow: {
    position: 'relative',
    borderBottom: '1px solid lightgray',
    transition: `height ${duration}ms ${easeOutBack}`,
    entering: { height: 80 },
    entered: { height: 230 },
    exiting: { height: 230 },
    exited: { height: 80 }
  },

  flip: {
    transition: `opacity ${duration}ms ease-in, transform ${duration}ms ease-out`,
    entering: {
      opacity: 0.01,
      transform: 'scale(1.1) rotateX(-40deg) translate3d(0, 20px, 50px)'
    },
    entered: {
      opacity: 1,
      transform: 'scale(1) rotateX(0deg) translate3d(0, 0, 0)'
    },
    exiting: {
      opacity: 1,
      transform: 'scale(1) rotateX(0deg) translate3d(0, 0, 0)'
    },
    exited: {
      opacity: 0.01,
      transform: 'scale(1.1) rotateX(-40deg) translate3d(0, 20px, 50px)'
    }
  },

  option: ({ theme, active, readableColor, name }) => {
    const css = {
      backgroundColor: color[`${name}_60`],
      borderRadius: theme.borderRadius_1,
      color: readableColor,
      cursor: 'pointer',
      display: 'inline-block',
      marginTop: 0,
      marginBottom: theme.space_stack_sm,
      marginRight: theme.space_inline_md,
      overflow: 'hidden',
      padding: theme.space_inset_md,
      position: 'relative',
      transition: `transform 600ms ${quintOut}`,
      transformStyle: 'preserve-3d',
      width: `calc(50% - ${theme.space_inline_sm})`,
      '&:hover': {
        transform: 'scale(1.05) rotateX(0deg) translate3d(0, 0, 0)'
      },
      '&:nth-child(even)': {
        marginRight: 0
      }
    };

    if (active) {
      css['&:after'] = {
        position: 'absolute',
        top: -18,
        right: -18,
        content: `""`,
        width: 30,
        height: 30,
        backgroundColor: 'white',
        transform: 'rotate(45deg)'
      };
    }

    return css;
  },
  optionList: ({ collapsed }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    display: collapsed ? 'none' : 'block'
  }),
  root: {
    perspective: '800px'
  },

  swatch: ({ theme, activeColor, collapsed }) => {
    const hue = color[`${activeColor}_60`];
    return {
      color: readableColor(hue),
      backgroundColor: hue,
      borderRadius: theme.borderRadius_1,
      cursor: 'pointer',
      display: collapsed ? 'block' : 'none',
      fontSize: theme.fontSize_h3,
      padding: theme.space_inset_md,
      textTransform: 'capitalize'
    };
  },

  title: ({ theme }) => ({
    marginTop: 0,
    [mobileBreakpoint]: {
      margin: `0 0 ${theme.space_stack_sm}`
    }
  })
};

const Root = createStyledComponent('div', styles.root);
const CollapseIcon = createStyledComponent(
  IconKeyboardArrowDown,
  styles.collapseIcon
);
const OptionList = createStyledComponent('div', styles.optionList);
const Option = createStyledComponent(Paragraph, styles.option);
const Swatch = createStyledComponent('div', styles.swatch);
const Title = createStyledComponent(Heading, styles.title);

// for growing the height of the picker
const Grow = ({ in: inProp, children }: GrowProps) => (
  <Transition
    in={inProp}
    timeout={{ enter: duration - 50, exit: duration / 2 }}>
    {state => (
      <div
        style={{
          ...styles.grow,
          ...styles.grow[state]
        }}>
        {children}
      </div>
    )}
  </Transition>
);

// entrance transition for the cards in the expanded menu
const Flip = ({
  activeColor,
  colorName,
  handleColorChange,
  readable,
  in: inProp
}: FadeProps) => (
  <Transition in={inProp} timeout={duration}>
    {state => {
      return (
        <Option
          style={{ ...styles.flip, ...styles.flip[state] }}
          variant="mouse"
          active={activeColor === colorName}
          name={colorName}
          readableColor={readable}
          onClick={() => handleColorChange(colorName)}>
          {colorName}
          <br />
          {color[`${colorName}_60`]}
        </Option>
      );
    }}
  </Transition>
);

export default class Picker extends React.Component {
  state = {
    collapsed: true,
    visibleThemes: 0,
    activeColor: 'blue'
  };

  props: Props;

  handleColorChange = color => {
    this.props.changeTheme(color);
    this.setState({ activeColor: color });
  };

  toggle = () => {
    if (this.state.collapsed) {
      // reset visibleThemes array so we can animate them in.
      this.setState({ collapsed: false, visibleThemes: 0 });
      // add the menu items one at a time to trigger the transitions
      this.interval = setInterval(() => {
        if (this.state.visibleThemes === availableThemes.length) {
          clearInterval(this.interval);
        } else {
          this.setState({ visibleThemes: this.state.visibleThemes + 1 });
        }
      }, 50);
    } else {
      this.setState({ visibleThemes: 0, collapsed: true });
      clearInterval(this.interval);
    }
  };

  render() {
    const { collapsed, visibleThemes, activeColor } = this.state;

    return (
      <Root>
        <CollapseIcon collapsed={collapsed} size="4em" onClick={this.toggle} />
        <Title level={2}>Select a Color</Title>

        <Grow in={!collapsed}>
          <Swatch
            activeColor={activeColor}
            onClick={this.toggle}
            collapsed={collapsed}>
            {activeColor}
          </Swatch>
          <OptionList collapsed={collapsed}>
            {availableThemes.map((colorName, index) => {
              const readable = readableColor(color[`${colorName}_60`]);
              return (
                <Flip
                  in={index < visibleThemes}
                  key={`flip_${index}`}
                  activeColor={activeColor}
                  colorName={colorName}
                  handleColorChange={this.handleColorChange}
                  readable={readable}
                />
              );
            })}
          </OptionList>
        </Grow>
      </Root>
    );
  }
}
