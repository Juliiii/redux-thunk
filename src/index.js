
/**
 * redux-chunk的源码就是这么简单, 默认到处不可以传进额外参数的thunk
 * 并同时把thunk的创建函数挂载在chunk的withExtraArgument上, 供有额
 * 外需求的用户使用
 * 
 */

/**
 * 该函数就是核心了, 为了能让用户根据自己的需求传入一些额外的参数,
 * 才采用这么一个写法吧。
 * 
 * 这个函数其实就是返回一个redux中间件, 这个中间件做的事也很简单
 * 就是判断用户dispatch的action的类型, 一般正常action的类型是
 * 简单对象, 但是如果是个function的话, 那就传入store的dispatch和
 * getState, 以及可能存在的额外参数, 执行该action.如果是简单对象,
 * 那就过, 传给下一个中间件。
 * 
 * 
 * @param {any} extraArgument 
 * @returns 
 */
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
