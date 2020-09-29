import React from 'react';
import { PageHeader } from 'antd'
function List() {
  return (
    <div className="List">
        <PageHeader
            className="site-page-header"
            title="Title"
            subTitle="This is a subtitle"
        />
        <div>list</div>
    </div>
  );
}

export default List;
