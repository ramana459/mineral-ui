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
import { createStyledComponent } from '../../../../styles';
import Heading from '../../Heading';
import Link from '../../Link';
import Markdown from '../../Markdown';

type Props = {
  bestPractices?: Array<Object>,
  children?: string,
  className?: string,
  examples?: Array<any>,
  props?: boolean,
  title: string,
  whenHowToUse?: string
};

const styles = {
  header: ({ theme }) => ({
    marginBottom: theme.space_stack_xl,
    paddingTop: theme.space_stack_md
  }),
  lede: ({ theme }) => ({
    fontSize: theme.fontSize_h3,
    lineHeight: theme.lineHeight_prose,
    margin: '0',
    '& p': {
      marginBottom: theme.space_stack_md
    }
  }),
  navElement: ({ theme }) => ({
    display: 'inline-block',
    marginRight: theme.space_inline_lg,
    marginBottom: theme.space_stack_sm,
    borderBottom: '3px solid transparent',
    cursor: 'pointer'
  }),
  subnav: ({ theme }) => ({
    borderBottom: `1px solid ${theme.borderColor}`,
    marginTop: theme.space_stack_md,
    marginBottom: 0
  }),
  title: ({ theme }) => ({
    marginRight: 'auto',
    paddingRight: theme.space_inline_sm
  })
};

const Root = createStyledComponent('header', styles.header);
const Lede = createStyledComponent(Markdown, styles.lede);
const NavElement = createStyledComponent(Link, styles.navElement);
const SubNav = createStyledComponent('nav', styles.subnav);
const Title = createStyledComponent(Heading, styles.title);

export default function DocHeader({
  bestPractices,
  children,
  className,
  examples,
  props,
  title,
  whenHowToUse
}: Props) {
  // there is no Examples h2, so we just link to the first example.
  let firstExampleId = 'examples';
  if (examples && examples.length > 0) {
    firstExampleId = examples[0].id;
  }

  const navElements = []; // only show the tabs menu if there is more than one tab
  if (examples && examples.length > 0) {
    navElements.push(
      <NavElement href={`#${firstExampleId}`} key="examples">
        Examples
      </NavElement>
    );
  }

  if (props) {
    navElements.push(
      <NavElement href="#api-and-theme" key="api-and-theme">
        API & Theme
      </NavElement>
    );
  }

  if (whenHowToUse || bestPractices) {
    navElements.push(
      <NavElement href="#usage" key="usage">
        Usage
      </NavElement>
    );
  }

  return (
    <Root className={className}>
      <Title level={1}>{title}</Title>
      <Lede>{children}</Lede>
      {navElements.length > 1 && <SubNav>{navElements}</SubNav>}
    </Root>
  );
}
