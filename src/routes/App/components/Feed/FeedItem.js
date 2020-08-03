import { IconButton } from 'react-toolbox-legacy/lib/button/index';
import { ListItem } from 'react-toolbox-legacy/lib/list/index';
import FeedItemTheme from './FeedItemTheme.scss';
import DeletedFeedItemTheme from './DeletedFeedItemTheme.scss';
import * as React from 'react';
import NoUnderlineLink from '../../../../components/NoUnderlineLink';

export default ({ icon, caption, legend, deleted, link }) => (
  <NoUnderlineLink to={link}>
    <ListItem
      key={caption + legend}
      leftIcon={icon}
      theme={deleted ? DeletedFeedItemTheme : FeedItemTheme}
      caption={caption}
      legend={legend}
      rightActions={[link && <IconButton icon="chevron_right" />]}
      ripple={false}
    />
  </NoUnderlineLink>
);
