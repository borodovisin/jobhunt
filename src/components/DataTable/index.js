import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-md/lib/DataTables/DataTable'
import TableBody from 'react-md/lib/DataTables/TableBody'
import TableRow from 'react-md/lib/DataTables/TableRow'
import TableColumn from 'react-md/lib/DataTables/TableColumn'
import TableHead from 'react-md/lib/DataTables/TableHeader'
import Paper from 'react-md/lib/Papers/Paper'
import Button from 'react-md/lib/Buttons/Button'

function DataTable(props) {
  const { rows, columns } = props;

  return (
    <Paper>
      <Table plain>
        <TableHead>
          <TableRow>
            {columns.map(({ title, headProps = {}}, idx) => (
              <TableColumn key={idx} {...headProps}>{title}</TableColumn>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              {columns.map((column, idx) => (
                <Row key={idx} {...column} row={row}/>
              ))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

function Row(props) {
  const {
    type, row, accessor, bodyProps = {}, actions = [],
    component: Cell} = props
  let children
  if (type === 'actions') {
    children = actions.map(({ label, className, icon, onClick, type, component: Action }) => {
      if (type === 'component') {
        return (
          <Action key={icon} row={row} label={label} icon={icon} onClick={onClick} />
        )
      }
      return (
        <Button
          icon
          children={icon}
          tooltipLabel={label}
          key={icon}
          className={className}
          onClick={() => onClick(row)}
        />
      )
    })
  } else if (type === 'component') {
    children = (
      <Cell row={row} />
    )
  } else {
    children = row[accessor]
  }
  return (
    <TableColumn {...bodyProps}>{children}</TableColumn>
  )
}

export default DataTable