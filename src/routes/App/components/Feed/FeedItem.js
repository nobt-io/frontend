import { IconButton } from 'react-toolbox-legacy/lib/button/index';
import { ListItem } from 'react-toolbox-legacy/lib/list/index';
import FeedItemTheme from './FeedItemTheme.scss';
import DeletedFeedItemTheme from './DeletedFeedItemTheme.scss';
import * as React from 'react';
import { Link } from 'react-router-dom';

export default ({ icon, caption, legend, deleted, link }) => (
  <Link
    to={link}
    style={{
      textDecoration: 'none',
    }}
  >
    <ListItem
      key={caption + legend}
      leftIcon={icon}
      theme={deleted ? DeletedFeedItemTheme : FeedItemTheme}
      caption={caption}
      legend={legend}
      rightActions={[link && <IconButton icon="chevron_right" />]}
      ripple={false}
    />
  </Link>
);
