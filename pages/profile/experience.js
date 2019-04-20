import React from 'react'
import { compose } from 'redux'
import withAuth from 'lib/hocs/auth'
import DateCell from 'components/DateCell'
import ProfilePage, { profilePropsKeys } from 'components/Profile/ProfilePage'
import {
  GetProfileData
} from 'redux/profile/actions'
import { formatMonthYearToISO, formatISOToDate } from 'lib/tools'
import withBasePage from 'lib/hocs/basePage'
import pick from 'lodash/pick'

function Experience(props) {
  const { onDelete, onEdit } = props
  return (
    <ProfilePage
      columns={getColumns()}
      pageIcon='work'
      pageName='Experience'
      {...pick(props, profilePropsKeys)}
    />
  )

  function getColumns() {
    return [
      {
        accessor: 'position',
        title: 'Position'
      },
      {
        accessor: 'company',
        title: 'Company'
      },
      {
        type: 'component',
        title: 'Dates',
        component: DateCell
      },
      {
        type: 'actions',
        actions: [
          {
            icon: 'edit',
            label: 'Edit',
            onClick: onEdit
          },
          {
            icon: 'delete',
            label: 'Delete',
            onClick: onDelete
          }
        ]
      }
    ]
  }
}

function getListRequestData(user) {
  return { user_id: user.id, fields: ['id', 'position', 'start_date', 'end_date', 'company']}
}

function dataFormatter(data, action, { user }) {
  switch(action) {
    case 'EDIT':
      return formatISOToDate(data)
    case 'SAVE_EDIT':
      return formatMonthYearToISO(data)
    case 'SAVE_CREATE':
      data.user_id = user.id
      return formatMonthYearToISO(data)
    default:
      return data
  }
}

const basePageProps = {
  getListRequestData,
  node: 'experience',
  dataPropKey: 'experiences',
  dialogPath: 'Experience',
  pageName: 'Experience',
  getListRequestAction: GetProfileData,
  dataFormatter 
}

export default compose(
  withAuth(),
  withBasePage(basePageProps)
)(Experience)
