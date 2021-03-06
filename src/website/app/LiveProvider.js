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
import dedent from 'dedent';
import Helmet from 'react-helmet';
import {
  LiveProvider as ReactLiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live';
import { createStyledComponent, getNormalizedValue } from '../../styles';

type Props = {
  backgroundColor?: string,
  chromeless?: boolean,
  hideSource?: boolean,
  pageMeta?: {
    title: string,
    canonicalLink: string
  },
  scope: Object,
  source: string
};

const styles = {
  livePreview: ({ backgroundColor, chromeless, theme }) => {
    return chromeless
      ? { padding: '1rem' }
      : {
          backgroundColor,
          border: `1px solid ${theme.borderColor}`,
          padding: theme.space_inset_md
        };
  },
  liveEditor: ({ theme }) => ({
    fontSize: theme.fontSize_ui,
    // Setting the maxHeight equal to, roughly, 20 lines,
    // then subtracting a bit to make it clear there's more beyond the scroll
    maxHeight: getNormalizedValue(
      `${parseFloat(theme.fontSize_ui) * theme.lineHeight * (20 - 0.5)}em`,
      theme.fontSize_ui
    ),
    overflow: 'auto'
  }),
  liveError: ({ theme }) => ({
    backgroundColor: '#fce3e3', // color.red_10
    color: theme.color_text_danger,
    fontFamily: theme.fontFamily_monospace,
    fontSize: theme.fontSize_mouse,
    lineHeight: theme.lineHeight_prose,
    overflow: 'auto',
    padding: '0 0.5rem', // Match value of the live-editor from .prism-code
    whiteSpace: 'pre',

    '&:first-line': {
      fontFamily: theme.fontFamily,
      fontWeight: theme.fontWeight_semiBold,
      // Can't use margin/padding here, so this is to space off the heading
      // from the code
      lineHeight: 2 * theme.lineHeight_prose
    }
  })
};

const MyLivePreview = createStyledComponent(LivePreview, styles.livePreview, {
  rootEl: 'div'
});
const MyLiveEditor = createStyledComponent(LiveEditor, styles.liveEditor);
const MyLiveError = createStyledComponent(LiveError, styles.liveError);

export default function LiveProvider({
  backgroundColor,
  chromeless,
  hideSource,
  pageMeta,
  scope,
  source
}: Props) {
  return (
    <div>
      {pageMeta && (
        <Helmet>
          <title>{pageMeta.title}</title>
          <link rel="canonical" href={pageMeta.canonicalLink} />
        </Helmet>
      )}
      <ReactLiveProvider
        code={dedent(source)}
        scope={scope}
        mountStylesheet={false}>
        <MyLivePreview
          backgroundColor={backgroundColor}
          chromeless={chromeless}
        />
        {!hideSource && [<MyLiveEditor key={0} />, <MyLiveError key={1} />]}
      </ReactLiveProvider>
    </div>
  );
}
