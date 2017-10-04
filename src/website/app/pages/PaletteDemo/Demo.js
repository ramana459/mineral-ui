import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { createStyledComponent } from '../../../../styles';
import { ThemeProvider } from '../../../../themes';
import Button from '../../../../Button';
import _Card, { CardBlock, CardTitle } from '../../../../Card';
import Dropdown from '../../../../Dropdown';
import IconBatteryCharging50 from '../../../../Icon/IconBatteryCharging50';
import IconQuestionAnswer from '../../../../Icon/IconQuestionAnswer';
import IconDirectionsBoat from '../../../../Icon/IconDirectionsBoat';
import IconSpa from '../../../../Icon/IconSpa';
import IconShoppingCart from '../../../../Icon/IconShoppingCart';
import Link from '../../../../Link';
import Menu, { MenuItem, MenuDivider } from '../../../../Menu';
import Heading from '../../Heading';
import Paragraph from '../../Paragraph';

type Props = {
  oldTheme: Object,
  newTheme: Object
};

type FadeProps = {
  children: React$Node,
  in: boolean
};

const dropdownData = [
  {
    title: 'Menu Title',
    items: [
      { text: 'Menu Item', endIcon: <IconSpa /> },
      { text: 'Menu Item' },
      { text: 'With icon', iconStart: <IconShoppingCart /> },
      { text: 'Menu Item' }
    ]
  }
];

const duration = 350;
const mobileBreakpoint = '@media(max-width: 45em)';

const styles = {
  root: ({ theme }) => ({
    flex: '1 1 auto',
    position: 'relative',
    '& button': {
      marginRight: theme.space_inline_md,
      marginBottom: theme.space_stack_md
    },
    [mobileBreakpoint]: {
      flexDirection: 'column',
      paddingTop: theme.space_stack_xxl
    },
    '& .fade-enter': {
      opacity: 0.01
    },
    '& .fade-enter.fade-enter-active': {
      transition: `opacity ${duration}ms ease-in`,
      opacity: 1
    },
    '& .fade-exit': {
      opacity: 1
    },
    '& .fade-exit.fade-exit-active': {
      opacity: 0
    }
  }),
  card: ({ theme }) => ({
    margin: `${theme.space_stack_xxl} 0`
  }),
  dropdownContainer: ({ theme }) => ({
    marginBottom: `${parseFloat(theme.space_stack_sm) * 32}em`
  }),
  icon: ({ theme }) => ({
    fill: theme.color_text_primary
  }),
  menuContainer: ({ theme }) => ({
    backgroundColor: theme.color_text_disabled,
    padding: theme.space_inset_lg,
    margin: `${theme.space_stack_xxl} 0`,
    maxWidth: '15rem',
    '& > div': {
      backgroundColor: 'white'
    }
  }),
  newTheme: {
    backgroundColor: 'white',
    position: 'absolute',
    top: -40, // not sure why I need this. should just be 0
    left: 0
  },
  paragraph: ({ theme }) => ({
    margin: `${theme.space_stack_xxl} 0 !important`
  })
};

const Root = createStyledComponent('div', styles.root);
const Card = createStyledComponent(_Card, styles.card);
const DropdownContainer = createStyledComponent(
  'div',
  styles.dropdownContainer
);
const Icon1 = createStyledComponent(IconBatteryCharging50, styles.icon);
const Icon2 = createStyledComponent(IconQuestionAnswer, styles.icon);
const Icon3 = createStyledComponent(IconDirectionsBoat, styles.icon);
const InlineText = createStyledComponent(Paragraph, styles.paragraph);
const MenuContainer = createStyledComponent('div', styles.menuContainer);
const NewTheme = createStyledComponent('div', styles.newTheme);

const Fade = ({ children, in: inProp }: FadeProps) => (
  <CSSTransition
    in={inProp}
    timeout={{ enter: duration, exit: 0 }}
    classNames="fade">
    {children}
  </CSSTransition>
);

const demoChildren = (
  <div>
    <Heading level={2}>Component gallery</Heading>
    <p>
      Components use the Mineral UI theme variables, which lets them pick up
      theme changes automatically.
    </p>
    <Button primary>Primary Button</Button>
    <Button>Regular Button</Button>
    <Button minimal>Minimal Button</Button>
    <Card>
      <CardTitle subtitle="Card subtitle here">Card Title</CardTitle>
      <CardBlock>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis
        pretium massa. <Link href="https://mineral-ui.com">Aliquam</Link> erat
        volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc
        lacinia auctor quam sed pellentesque.
      </CardBlock>
    </Card>
    <Button iconEnd={<IconSpa />}>Button With Icon</Button>
    <Button size="jumbo" circular iconStart={<IconBatteryCharging50 />} />
    <Button size="jumbo" iconStart={<IconShoppingCart />} />
    <InlineText variant="prose">
      A link to <Link href="https://mineral-ui.com">mineral-ui.com</Link>.
    </InlineText>
    <DropdownContainer>
      <Dropdown
        data={dropdownData}
        isOpen
        modifiers={{ flip: { enabled: false } }}>
        <Button>Always Open Dropdown</Button>
      </Dropdown>
    </DropdownContainer>
    <Icon2 size="5em" />
    <Icon1 size="5em" />
    <Icon3 size="5em" />
    <MenuContainer>
      <Menu>
        <MenuItem iconStart={<IconSpa />} iconEnd={<IconSpa />}>
          With icons
        </MenuItem>
        <MenuItem variant="success">Success</MenuItem>
        <MenuItem variant="warning">Warning</MenuItem>
        <MenuDivider />
        <MenuItem variant="danger">Danger</MenuItem>
      </Menu>
    </MenuContainer>
  </div>
);

export default class Demo extends React.Component {
  state = { showNewTheme: true };

  props: Props;

  componentWillReceiveProps(props) {
    if (
      props.newTheme.color_text_primary !==
      this.props.newTheme.color_text_primary
    ) {
      this.setState({ showNewTheme: false });
      setTimeout(() => {
        this.setState({ showNewTheme: true });
      }, 0);
    }
  }

  render() {
    const { showNewTheme } = this.state;
    const { oldTheme, newTheme } = this.props;

    return (
      <Root>
        <ThemeProvider theme={oldTheme}>{demoChildren}</ThemeProvider>
        <Fade in={showNewTheme}>
          <NewTheme>
            <ThemeProvider theme={newTheme}>{demoChildren}</ThemeProvider>
          </NewTheme>
        </Fade>
      </Root>
    );
  }
}
