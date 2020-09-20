import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'

const ALL_PERSONS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      born: $born
    ) {
      name,
      born
    }
  }
`


const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_PERSONS)
  const [ updateAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_PERSONS } ]
  })

  if (!props.show) {
    return null
  }

  if ( result.loading ) {
    return <div>loading...</div>
  }


  const submit = async (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name, born } })
    setName('')
    setBorn('')
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>set birth year</h2>
      <form onSubmit={submit}>
        <table>
          <tr>
            <td>name</td>
            <td><input value={name} onChange={({ target }) => setName(target.value)} /></td>
          </tr>
          <tr>
            <td>born</td>
            <td><input value={born} onChange={({ target }) => setBorn(Number(target.value))}/></td>
          </tr>
          <tr>
            <td><button type='submit'>update author</button></td>
          </tr>
        </table>
      </form>

    </div>
  )
}

export default Authors