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
import { createStyledComponent } from '../../styles';
import LogotypeHorizontal from './LogotypeHorizontal';
import Heading from './SiteHeading';
import Link from './SiteLink';
import sections from './pages';

type Props = {
  demos: Object
};

const styles = {
  heading: {
    margin: '0'
  },
  logo: {
    width: 157
  },
  list: {
    listStyle: 'none',
    paddingLeft: '0'
  },
  listItem: ({ isSubcomponent, theme }) => ({
    paddingLeft: isSubcomponent && theme.space_inline_sm,

    '& + li': {
      marginTop: theme.space_stack_sm
    }
  }),
  nav: ({ theme }) => ({
    padding: theme.space_inset_md,
    backgroundColor: 'rgba(0,0,0,0.9)'
  })
};

const Root = createStyledComponent('nav', styles.nav);
const SectionHeading = createStyledComponent(
  Heading,
  styles.heading
).withProps({
  as: 'h2',
  level: 4
});
const List = createStyledComponent('ol', styles.list);
const ListItem = createStyledComponent('li', styles.listItem);
const Logo = createStyledComponent(LogotypeHorizontal, styles.logo);

export default function Nav({ demos, ...restProps }: Props) {
  const rootProps = { ...restProps };

  const demoLinks = Object.keys(demos).map(slug => {
    const demo = demos[slug];
    return (
      <ListItem key={slug} isSubcomponent={demo.subcomponent}>
        <Link to={`/components/${slug}`}>{demo.title}</Link>
      </ListItem>
    );
  });

  const nav = sections.map((section, index) => {
    return (
      <div key={index}>
        <SectionHeading>{section.heading}</SectionHeading>
        <List>
          {section.pages.map(page => {
            return (
              !page.hiddenInNav && (
                <ListItem key={page.title}>
                  <Link to={page.path}>{page.title}</Link>
                </ListItem>
              )
            );
          })}
        </List>
      </div>
    );
  });

  return (
    <Root {...rootProps}>
      <Link to="/">
        <h1>
          <Logo fill="#fff" />
        </h1>
      </Link>
      {nav}
      <SectionHeading>Components</SectionHeading>
      <List>{demoLinks}</List>
    </Root>
  );
}
