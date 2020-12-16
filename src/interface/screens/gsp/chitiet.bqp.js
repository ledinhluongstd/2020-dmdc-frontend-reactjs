import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page404, Other } from 'interface/screens/error';
import { BreadCrumbs, FormInput, FormWrapper } from 'interface/components';
import { __DEV__ } from '../../../common/ulti/constants';
import * as CONSTANTS from 'common/ulti/constants';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import moment from 'moment';
import * as cmFunction from 'common/ulti/commonFunction';
import * as tbDMDCQG from 'controller/services/tbDMDCQGServices';
import * as tbBanGhiDMDCQG from 'controller/services/tbBanGhiDMDCQGServices';
import { fetchToastNotify } from '../../../controller/redux/app-reducer';
import queryString from 'query-string'

class ChiTiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInsert: false,
      error: false,
      form: {},
      danhsach: []
    };
  }

  componentDidMount() {
    this._init();
  }

  componentDidUpdate(prevProps) {
    let { match } = this.props;
    if (match.params.id !== prevProps.match.params.id) {
      this._init();
    }

    let { location } = this.props
    if (location !== prevProps.location) {
      this._getDanhSachBanGhiDMDCQG(this._createFilter())
    }
  }

  _init = async () => {
    let id = this.props.match.params.id;
    this.state.isInsert = id == 0;
    if (!this.state.isInsert) {
      let data = await tbDMDCQG.getById(id);
      if (data) {
        this.state.form = data;
        this.forceUpdate()
        this._getDanhSachBanGhiDMDCQG(this._createFilter())
      }
      if (!data) this.state.error = true;
      this.forceUpdate();
    }
  };

  _handleChangeElement = (evt) => {
    return
    this.state.form[evt.target.id] = evt.target.value;
    this.forceUpdate();
  };


  _getDanhSachBanGhiDMDCQG = async (query) => {
    let data = await tbBanGhiDMDCQG.getAll(query)
    let danhsach = data && data._embedded ? data._embedded : [];
    danhsach.forEach(function (v) { delete v._id; delete v._etag });
    this.state.danhsach = danhsach
    this.state._size = data._size || 0
    this.state._total_pages = data._total_pages || 0
    this.state.cbCheckAll = false
    this.forceUpdate()
  }

  _createFilter = () => {
    // let { data } = this.state
    // let parsed = queryString.parse(this.props.location.search);
    // let { page, pagesize, filter } = parsed
    // filter = filter ? cmFunction.decode(filter) : filter
    // parsed.page = parseInt(page) || CONSTANTS.DEFAULT_PAGE
    // parsed.pagesize = parseInt(pagesize) || CONSTANTS.DEFAULT_PAGESIZE
    // parsed.count = true
    // // parsed.keys = JSON.stringify({ BanGhi: 0 })
    // // parsed.sort_by = "STT"
    // !filter ? delete parsed.filter : parsed.filter = filter
    // this.state.page = parseInt(page) || CONSTANTS.DEFAULT_PAGE
    // this.state.pagesize = parseInt(pagesize) || CONSTANTS.DEFAULT_PAGESIZE
    // this.state.filter = filter
    // this.forceUpdate()
    // return new URLSearchParams(parsed).toString()

    let { form } = this.state
    let parsed = queryString.parse(this.props.location.search);
    let { page, pagesize } = parsed
    let filter = {}
    parsed.page = parseInt(page) || CONSTANTS.DEFAULT_PAGE
    parsed.pagesize = parseInt(pagesize) || CONSTANTS.DEFAULT_PAGESIZE
    parsed.count = true
    // parsed.keys = JSON.stringify({ BanGhi: 0 })
    // parsed.sort_by = "STT"
    if (form.CategoryCode) {
      filter['CategoryCode'] = form.CategoryCode
      // filter['$or'] = [
      //   { 'CategoryName': cmFunction.regexText(data.CategoryCode) },
      //   { 'CategoryCode': cmFunction.regexText(data.CategoryCode) }
      // ]
      parsed.filter = JSON.stringify(filter)
    }
    this.state.page = parseInt(page) || CONSTANTS.DEFAULT_PAGE
    this.state.pagesize = parseInt(pagesize) || CONSTANTS.DEFAULT_PAGESIZE
    this.forceUpdate()
    return new URLSearchParams(parsed).toString()
  }

  render() {
    let { danhsach, form, error } = this.state;
    if (error) return <Page404 />;
    let keyNonDisplay = ['_id', 'BanGhi', '_etag', 'code', 'createdAt', 'createdBy', 'isActive', 'modifiedAt', 'modifiedBy']
    try {
      return (
        <div className="main portlet">
          <BreadCrumbs
            title={'Chi tiết'}
            route={[
              { label: 'Quản lý danh mục Quốc gia', value: '/quoc-gia/nhom-danh-muc' },
              { label: 'Thông tin danh mục Quốc gia', value: '/quoc-gia/danh-muc/:id' },
            ]}
          />
          <div className="portlet-title">
            <div className="caption">
              <i className="fas fa-grip-vertical" />
              Thông tin danh mục Quốc gia
            </div>
            <div className="action">
              <button
                onClick={cmFunction.goBack}
                className="btn btn-sm btn-outline-primary border-radius"
              >
                <i className="fas fa-reply" />
                Quay lại
              </button>
              <button
                onClick={this._init}
                className="btn btn-sm btn-outline-primary border-radius"
              >
                <i className="fas fa-sync" />
                Làm mới
              </button>
            </div>
          </div>
          <div className="card">
            <div
              className="card-header d-flex justify-content-between"
              data-toggle="collapse"
              data-target="#collapseExample"
              aria-expanded="true"
              aria-controls="collapseExample"
            >
              <span className="caption-subject">Thông tin cơ bản</span>
              <span>
                <i className="fas fa-chevron-up" />
                <i className="fas fa-chevron-down" />
              </span>
            </div>
            <div className="collapse show" id="collapseExample">
              <div className="card-body">
                <div className="form-body" ref="form">
                  {Object.keys(form).map(function (key, index) {
                    let checkKey = keyNonDisplay.findIndex(x => x === key)
                    if (checkKey === -1 && !!form[`${key}`]) {
                      return <React.Fragment key={index}> <FormWrapper>
                        <FormInput
                          required={false}
                          disabled={true}
                          readOnly={true}
                          onChange={null}
                          defaultValue={form[`${key}`] || ''}
                          type="text"
                          id={key}
                          label={key + ': '}
                          placeholder={key}
                        />
                      </FormWrapper>
                      </React.Fragment>
                    }
                  })}
                </div>
              </div>
              <div className="card-footer"></div>
            </div>
          </div>

          {!!danhsach.length && <div className="card">
            <div
              className="card-header d-flex justify-content-between"
              data-toggle="collapse"
              data-target="#collapseBanGhi"
              aria-expanded="true"
              aria-controls="collapseBanGhi"
            >
              <span className="caption-subject">Bản ghi&nbsp;{danhsach.length}</span>
              <span>
                <i className="fas fa-chevron-up" />
                <i className="fas fa-chevron-down" />
              </span>
            </div>
            <div className="collapse show" id="collapseBanGhi">
              <div className="card-body ">
                <div className="form-body">
                  <div className="col table-fix-head-custom">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0" ref="dataTable">
                      <thead>
                        <tr>
                          <th>STT</th>
                          {
                            danhsach[0] && Object.keys(danhsach[0]).map(function (key, index) {
                              return (<th key={index}>{key}</th>)
                            })
                          }
                        </tr>
                      </thead>
                      <tbody>
                        {!!danhsach && danhsach.map((item, index) => {
                          return <tr key={index} >
                            <td className='text-center'>{index + 1}</td>
                            {
                              item && Object.keys(item).map(function (key, ind) {
                                return (<td key={ind}>{item[`${key}`]}</td>)
                              })
                            }
                          </tr>
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        </div>
      );
    } catch (e) {
      if (__DEV__) console.log(e);
      return <Other data={e} />;
    }
  }
}

const mapStateToProps = (state) => {
  let { LoginRes, General } = state;
  return { LoginRes, General };
};
export default connect(mapStateToProps)(ChiTiet);
