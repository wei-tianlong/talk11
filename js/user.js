// 用户登录和注册的表单项验证的通用代码

/**
 * 对某个表单项惊醒验证的构造函数
 */
class FieldValidator {
  /**
   * 构造器
   * @param {String} txtId 文本框的ID
   * @param {Function} validatorFunc 验证规则函数，当需要对该文本框进行验证时，会调用该函数，函数的参数为当前文本框的值，函数的返回值为验证的错误消息，若没有返回则表示无错误
   *
   */
  constructor(txtId, validatorFunc) {
    this.input = $("#" + txtId);
    this.p = this.input.nextElementSibling;
    // 验证（失去焦点，表单提交）
    this.validatorFunc = validatorFunc;
    // 失去焦点时验证 
    this.input.addEventListener('blur', () => {
      this.validate();
    })
    // console.log(this.input, this.p);
  }
  
  /**
   * 验证方法，成功返回true，失败返回false
   */
  async validate() {//原型方法
    const err = await this.validatorFunc(this.input.value);
    if (err) {
      // 有错误
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = '';
      return true;
    }
  }

  /**
   * 对传入的所有验证器进行统一的验证，如果所有的验证均通过，则返回true，否则返回false
   * @param {FieldValidator[]} validators 用map映射数组validators得到每一
   */
  static async validate(...validators) {//静态方法
    const proms = validators.map((v) => v.validate());//v.validate()，每一个验证器调用validate()方法，相当于
    // loginIdValidator调用validate()等，然后每个方法会返回一个promise
    const results = await Promise.all(proms);//Promise.all(任务数组)返回一个任务任务数组全部成功则成功任何一个失败则失败
    return results.every((r) => r);//判断数组中是否所有项都能通过该函数的测试(让每一项的值传入参数看他返回的值是否全为true)
  }
}
