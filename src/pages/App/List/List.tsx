import React from 'react';
import { PageHeader,Timeline } from 'antd'
function List() {
  return (
    <div className="List">
        <PageHeader
            className="site-page-header"
            title="更新日志"
            subTitle="Update log"
        />
        <Timeline>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item>
                <p>Solve initial network problems 2015-09-01</p>
                <p>Solve initial network problems 2015-09-01</p>
                <p>Solve initial network problems 2015-09-01</p>
            </Timeline.Item>
            <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        </Timeline>
    </div>
  );
}

export default List;
