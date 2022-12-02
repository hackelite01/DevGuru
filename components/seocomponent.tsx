import Head from "next/head"
import { NextSeo, LogoJsonLd, SoftwareAppJsonLd, WebPageJsonLd } from "next-seo"

export default function seocomponent(props: any) {
  return (
    <>
      <Head>
        <head>
          <meta lang="en" />
          <meta http-equiv="content-Type" content="text/html; utf-8" />
          <meta http-equiv="Pragma" content="cache" />
          <meta name="robots" content="INDEX,FOLLOW" />
          <meta http-equiv="content-Language" content="en" />
          <meta
            name="description"
            content="A tool for programming and much more. Generate Code just by typing a text description. AI will help you to generate the code in a few seconds."
          />
          <meta
            name="keywords"
            content="programming ai devguru free helper code generator help from text description tool typing a text description AI will help you to generate the code in a few seconds Appsplosion regex to explanation time complexity translate docstring"
          />
          <meta name="author" content="Appsplosion Team" />
          <meta name="publisher" content="Appsplosion" />
          <meta name="copyright" content="" />
          <meta name="audience" content="All" />
          <meta name="page-type" content="Productinfo" />
          <meta name="page-topic" content="Computer" />
          <meta http-equiv="Reply-to" content="appsplosion.help@gmail.com" />
          <meta name="revisit-after" content="2 days" />
        </head>
      </Head>
      <NextSeo
        title={props.title}
        description={
          "A tool for programming and much more. Generate Code just by typing a text description. AI will help you to generate the code in a few seconds." +
          props.title
        }
        canonical={"https://www.devguru.ml/" + props.apipath}
        openGraph={{
          title: props.title,
          type: "website",
          locale: "en_US",
          description:
            "A tool for programming and much more. Generate Code just by typing a text description. AI will help you to generate the code in a few seconds." +
            props.title,
          url: "https://www.devguru.ml/" + props.apipath,
          site_name: props.title,
          images: [
            {
              url: "https://images.pexels.com/photos/6424586/pexels-photo-6424586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              alt: "Header Hero Image programs on screen",
            },
          ],
        }}
      />
      <LogoJsonLd
        logo="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        url="https://www.devguru.ml.com/"
      />
      <SoftwareAppJsonLd
        name="Programming Helper"
        price="0.00"
        priceCurrency="USD"
        aggregateRating={{ ratingValue: "4.9", reviewCount: "8864" }}
        operatingSystem="WEB"
        applicationCategory="WebApplication"
      />
    </>
  )
}
