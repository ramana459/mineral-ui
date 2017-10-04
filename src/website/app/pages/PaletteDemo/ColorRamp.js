import React from 'react';
import { createStyledComponent } from '../../../../styles';
import Paragraph from '../../Paragraph';

type Props = {
  isGray?: boolean,
  ramp: Object
};

const transitionEffect = '350ms cubic-bezier(0.23, 1, 0.32, 1)';

const styles = {
  hue: ({ theme }) => ({
    margin: `0 0 ${theme.space_stack_sm}`,
    padding: theme.space_inset_sm,
    position: 'relative',
    '& span:nth-child(2), & span:nth-child(3)': {
      fontFamily: theme.fontFamily_monospace,
      display: 'inline-block',
      marginLeft: theme.space_inline_xl,
      transition: `opacity 250ms linear, transform ${transitionEffect}`
    },
    '& span:nth-child(2)': {
      opacity: 1
    },
    '& span:nth-child(3)': {
      left: theme.space_inset_sm,
      opacity: 0,
      position: 'absolute',
      top: theme.space_inset_sm,
      transform: 'translate(6em, 0)'
    },
    '&:hover span:nth-child(2)': {
      opacity: 0
    },
    '&:hover span:nth-child(3)': {
      opacity: 1,
      transform: 'translate(0, 0)'
    }
  }),
  // this is a separate named component because decendent selectors
  // using passed props are VERY slow in glamorous
  swatch: ({ theme, color }) => ({
    display: 'inline-block',
    backgroundColor: color,
    borderRadius: theme.borderRadius_1,
    position: 'absolute',
    height: theme.space_stack_xl,
    width: theme.space_stack_xl,
    top: theme.space_stack_xs,
    left: 0
  })
};

const Hue = createStyledComponent(Paragraph, styles.hue);
const Swatch = createStyledComponent('span', styles.swatch);

export default class ColorRamp extends React.PureComponent {
  props: Props;

  render() {
    const { ramp, isGray } = this.props;

    return (
      <div>
        <Paragraph variant="ui">Theme {isGray ? 'gray' : 'primary'}</Paragraph>
        {Object.entries(ramp).map(([, color], index) => (
          <Hue key={`${isGray ? 'gray' : 'hue'}_${index}`} variant="ui">
            <Swatch color={color} />
            <span>{`theme_${index}`}</span> <span>{color}</span>
          </Hue>
        ))}
      </div>
    );
  }
}
