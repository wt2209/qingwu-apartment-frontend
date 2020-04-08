import React from 'react';
import { connect } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import { ConnectState, ConnectProps } from '@/models/connect';
import { CurrentUser } from '@/models/user';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: CurrentUser;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  async componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    if (dispatch) {
      const token = localStorage.getItem('access_token')
      if (token) {
        await dispatch({
          type: 'login/changeLoginStatus',
          payload: {
            status: 'ok',
            accessToken: token
          }
        })
      }

      await dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    // const isLogin = currentUser && currentUser.id;
    const isLogin = localStorage.getItem('access_token')
    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login?${queryString}`} />;
    }
    return children;
  }
}

export default connect(({ user, loading, login }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
  accessToken: login.accessToken,
}))(SecurityLayout);
