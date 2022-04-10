import { Navbar } from '../../component/common/Navbar'
import Head from 'next/head'
import Filters from '../../component/filters'
import Container from '../../component/common/Container'
import EmailListing from '../../component/email-listing'

export default function Emails() {
  return (
    <>
      <Head>
        <title>Ecom Site | Emails</title>
      </Head>
      <Navbar />
      <Container>
        <Filters />
        <EmailListing />
      </Container>
    </>
  )
}
