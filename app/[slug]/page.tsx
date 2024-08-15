import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { BASE_URL } from '@/config';
import { serviceStocks } from '@/services';
import { StockIntro } from '@/components/StockIntro';
import { BuyStock } from '@/components/BuyStock';
import Candles from '@/components/Candles/Candles';
import styles from './styles.module.scss';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const stockData = await serviceStocks.getByTicker(params.slug);
  const dataIntro = stockData?.data;

  if (!dataIntro) {
    return {
      title: 'Stock not found',
    };
  }

  const metaDescription = `Information about stock ${dataIntro.name} (${dataIntro.ticker}). Sector: ${dataIntro.sector}, Country: ${dataIntro.countryOfRisk}`;
  const keywords = `${dataIntro.name}, ${dataIntro.ticker}, ${dataIntro.sector}, ${dataIntro.countryOfRiskName}, stock, invest`;
  const canonicalUrl = `${BASE_URL}/${params.slug}`;

  return {
    title: `${dataIntro.name} (${dataIntro.ticker}) - Information about stock`,
    description: metaDescription,
    keywords: keywords,
    openGraph: {
      title: `${dataIntro.name} (${dataIntro.ticker}) - Information about stock`,
      description: metaDescription,
      type: 'website',
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const PageStock = async ({ params }: Props) => {
  try {
    const [stockData, lastPriceData, candlesData] = await Promise.all([
      serviceStocks.getByTicker(params.slug),
      serviceStocks.getLastPriceByTicker(params.slug),
      serviceStocks.getCandlesByTicker(params.slug),
    ]);

    const dataIntro = stockData?.data;
    const dataLastPrice = lastPriceData?.data;
    const dataCandlesByTicker = candlesData?.data;

    return (
      <div className={styles.page}>
        <div className={styles.main}>
          <div className={styles.intro}>
            {stockData?.data ? (
              <StockIntro data={stockData?.data} />
            ) : (
              <span>Not data</span>
            )}
          </div>
          {candlesData?.data ? (
            <Candles
              currency={stockData?.data?.currency}
              data={candlesData?.data}
            />
          ) : (
            <span>Not data</span>
          )}
        </div>
        <div className={styles.side}>
          {lastPriceData?.data && candlesData?.data ? (
            <BuyStock
              candlesData={candlesData?.data}
              currency={stockData?.data?.currency}
              data={lastPriceData?.data}
            />
          ) : (
            <span>Not data</span>
          )}

        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading stock data:', error);
    return <div>Error loading stock data</div>;
  }
};

export default PageStock;
