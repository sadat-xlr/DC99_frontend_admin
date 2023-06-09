import React from 'react';
import { NotificationOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';

import PageHeader from '@iso/components/utility/pageHeader';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import ContentHolder from '@iso/components/utility/contentHolder';
import IntlMessages from '@iso/components/utility/intlMessages';
import basicStyle from '@iso/assets/styles/constants';
import Badge from './Badge.styles';

export default function() {
  const { rowStyle, colStyle, gutter } = basicStyle;
  return (
    <LayoutWrapper>
      <PageHeader>{<IntlMessages id="uiElements.badge.badge" />}</PageHeader>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={12} sm={12} xs={24} style={colStyle}>
          <Box
            title={<IntlMessages id="uiElements.badge.basicExample" />}
            subtitle={
              <IntlMessages id="uiElements.badge.basicExampleSubTitle" />
            }
          >
            <ContentHolder>
              <Badge count={5}>
                <a className="isoBadgeLink" href="# ">
                  {' '}
                </a>
              </Badge>
              <Badge count={0} showZero>
                <a className="isoBadgeLink" href="# ">
                  {' '}
                </a>
              </Badge>
            </ContentHolder>
          </Box>
        </Col>
        <Col md={12} sm={12} xs={24} style={colStyle}>
          <Box
            title={<IntlMessages id="uiElements.badge.overflowCount" />}
            subtitle={
              <IntlMessages id="uiElements.badge.overflowCountSubTitle" />
            }
          >
            <ContentHolder>
              <Badge count={99}>
                <a className="isoBadgeLink" href="# ">
                  {' '}
                </a>
              </Badge>
              <Badge count={100}>
                <a className="isoBadgeLink" href="# ">
                  {' '}
                </a>
              </Badge>
              <Badge count={99} overflowCount={10}>
                <a className="isoBadgeLink" href="# ">
                  {' '}
                </a>
              </Badge>
              <Badge count={1000} overflowCount={999}>
                <a className="isoBadgeLink" href="# ">
                  {' '}
                </a>
              </Badge>
            </ContentHolder>
          </Box>
        </Col>
      </Row>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={12} sm={12} xs={24} style={colStyle}>
          <Box
            title={<IntlMessages id="uiElements.badge.status" />}
            subtitle={<IntlMessages id="uiElements.badge.statusSubTitle" />}
          >
            <ContentHolder>
              <Badge status="success" />
              <Badge status="error" />
              <Badge status="default" />
              <Badge status="processing" />
              <Badge status="warning" />
              <br />
              <br />
              <Badge
                status="success"
                text={<IntlMessages id="uiElements.badge.success" />}
              />
              <br />
              <Badge
                status="error"
                text={<IntlMessages id="uiElements.badge.error" />}
              />
              <br />
              <Badge
                status="default"
                text={<IntlMessages id="uiElements.badge.default" />}
              />
              <br />
              <Badge
                status="processing"
                text={<IntlMessages id="uiElements.badge.processing" />}
              />
              <br />
              <Badge
                status="warning"
                text={<IntlMessages id="uiElements.badge.warning" />}
              />
            </ContentHolder>
          </Box>
        </Col>
        <Col md={12} sm={12} xs={24} style={colStyle}>
          <Box
            title={<IntlMessages id="uiElements.badge.redBadge" />}
            subtitle={<IntlMessages id="uiElements.badge.redBadgeSubTitle" />}
          >
            <ContentHolder>
              <Badge dot>
                <NotificationOutlined />
              </Badge>
              <Badge dot>
                <a href=".">
                  {<IntlMessages id="uiElements.badge.linkSomething" />}
                </a>
              </Badge>
            </ContentHolder>
          </Box>
        </Col>
      </Row>
    </LayoutWrapper>
  );
}
