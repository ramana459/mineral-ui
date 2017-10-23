/**
 * Copyright 2017 CA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */
import React from 'react';
import { createStyledComponent, pxToEm } from '../../../../utils';
import IconCheck from '../../../../Icon/IconCheck';
import ThemeProvider from '../../../../ThemeProvider';

type Props = {
  children: React$Node,
  index: number,
  setIndex: (index: number) => void,
  themes: Array<Object>
};

type OptionProps = {
  children: React$Node,
  isActive: boolean,
  onClick: () => void,
  themes: Array<Object>,
  thisIndex: number
};

const styles = {
  root: ({ theme }) => ({
    marginTop: theme.space_stack_xl,
    position: 'relative', // for z-index
    zIndex: 2,

    '@media(min-width: 23em)': {
      display: 'grid',
      gridGap: theme.space_inline_sm,
      gridTemplateColumns: 'repeat(3, auto)',
      gridTemplateRows: `min-content auto`
    },

    '@media(min-width: 48em)': {
      gridGap: theme.space_inline_md,
      gridTemplateColumns: 'min-content auto',
      gridTemplateRows: 'repeat(3, auto)'
    }
  }),
  optionRoot: ({ isActive, theme, themes, thisIndex }) => ({
    alignItems: 'center',
    backgroundColor: isActive
      ? themes[thisIndex].color_theme_10
      : theme.color_white,
    border: `1px solid ${isActive ? theme.color_white : 'transparent'}`,
    borderRadius: theme.borderRadius_1,
    boxShadow: isActive ? `0 0 0 1px ${theme[`borderColor_focus`]}` : null,
    cursor: 'pointer',
    display: 'flex',
    marginBottom: theme.space_stack_sm,
    padding: `${theme.space_inset_sm} ${theme.space_inset_lg}`,
    position: 'relative',
    width: '100%',
    '&::-moz-focus-inner': { border: 0 },

    '&:focus,&:hover': {
      backgroundColor: themes[thisIndex].color_theme_10
    },

    '@media(min-width: 23em)': {
      marginBottom: 0,
      padding: theme.space_inset_sm,
      justifyContent: 'center'
    },

    '@media(min-width: 29em)': {
      alignItems: 'flex-start',
      flexDirection: 'column',
      padding: `
        ${theme.space_inset_md}
        ${theme.space_inset_md}
        ${theme.space_inset_md}
        ${parseFloat(theme.space_inset_md) +
        1.25 + // Large icon size
        parseFloat(theme.space_inset_sm) + // padding left & right
          parseFloat(theme.space_inline_sm)}em
      `
    }
  }),
  optionHex: ({ theme }) => ({
    display: 'block',
    fontSize: theme.fontSize_mouse,
    marginTop: theme.space_stack_xxs,

    '@media(max-width: 28.999em)': {
      display: 'none'
    }
  }),
  optionIcon: ({ isActive, theme, themes, thisIndex }) => ({
    backgroundColor: themes[thisIndex].color_theme_60,
    borderRadius: theme.borderRadius_1,
    boxSizing: 'content-box',
    flex: '0 0 auto',
    fill: isActive ? theme.color_white : 'transparent',
    marginRight: theme.space_inline_xs,
    padding: `${parseFloat(theme.space_inset_sm) / 2}em`,

    '@media(min-width: 29em)': {
      height: '1.25em', // Large size
      left: theme.space_inset_md,
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '1.25em' // Large size
    }
  }),
  optionName: ({ theme }) => ({
    color: theme.color_gray_100,
    display: 'block',
    fontSize: theme.fontSize_ui,
    fontWeight: theme.fontWeight_bold
  }),
  sandbox: ({ theme }) => ({
    backgroundColor: theme.color_white,
    borderRadius: theme.borderRadius_1,
    gridColumn: '1 / span 3',
    padding: `${theme.space_inset_lg} ${pxToEm(28)}`,

    '@media(min-width: 48em)': {
      gridColumn: 2,
      gridRow: '1 / span 4'
    },

    '& h3': {
      color: theme.color_theme_80
    },

    '& p > a:link': {
      fontWeight: theme.fontWeight_semiBold
    },

    '& button': {
      '@media(max-width: 22.999em)': {
        padding: `0 ${theme.space_inline_xxs}`,
        width: '100%',

        // Content, with a specificity hack
        '& > span > span[class]': {
          paddingLeft: theme.space_inline_xxs,
          paddingRight: theme.space_inline_xxs
        }
      }
    }
  })
};

const Root = createStyledComponent('div', styles.root, {
  includeStyleReset: true
});
const OptionRoot = createStyledComponent('button', styles.optionRoot, {
  includeStyleReset: true
});
const OptionHex = createStyledComponent('span', styles.optionHex);
const OptionIcon = createStyledComponent(IconCheck, styles.optionIcon);
const OptionName = createStyledComponent('span', styles.optionName);
const Sandbox = createStyledComponent('div', styles.sandbox);

const Option = ({
  children,
  thisIndex,
  isActive,
  onClick,
  themes,
  ...restProps
}: OptionProps) => {
  const rootProps = {
    onClick,
    isActive,
    themes,
    thisIndex,
    ...restProps
  };
  const iconProps = {
    isActive,
    size: 'small',
    themes,
    thisIndex
  };
  return (
    <OptionRoot {...rootProps}>
      <OptionIcon {...iconProps} />
      <OptionName>{children}</OptionName>
      <OptionHex>{themes[thisIndex].color_theme_60}</OptionHex>
    </OptionRoot>
  );
};

const handleClick = (fn: () => void) => {
  fn();
  // TODO: blur here
};

export default function ThemePlaygound({
  children,
  index,
  setIndex,
  themes,
  ...restProps
}: Props) {
  const rootProps = {
    ...restProps
  };
  return (
    <ThemeProvider theme={themes[index]}>
      <Root {...rootProps}>
        {themes.map((theme, i) => {
          const optionProps = {
            isActive: index === i,
            key: i,
            onClick: () => {
              handleClick(() => setIndex(i));
            },
            themes: themes,
            thisIndex: i
          };
          return <Option {...optionProps}>{theme.name}</Option>; // eslint-disable-line react/jsx-key
        })}
        <Sandbox>{children}</Sandbox>
      </Root>
    </ThemeProvider>
  );
}
