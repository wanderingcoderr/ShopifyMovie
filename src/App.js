import logo from './logo.svg';
import './App.css';
import { AppProvider , Page , Card , ResourceList, Pagination, Banner , Layout} from '@shopify/polaris';
import  SearchComponent  from './components/search-component';
import  ResultComponent  from './components/result-component';
import  NominationComponent  from './components/nomination-component';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [movieResult,setMovieResult] = useState([]);
  const [nominations,setNominations] = useState();
  const [totalResults,setTotalResult] = useState();
  const [currentPage,setCurrentPage] = useState();
  const [lastPage,setLastPage] = useState();
  const [searchTerm,setSearchTerm] = useState();
  const [showError,setBanner] = useState(false);
  const [loading,setLoading] = useState(false);

  //Fetch the movies nominated by user 
  useEffect(() => {
    if(localStorage.getItem('Nominations')) {
      setNominations(JSON.parse(localStorage.getItem("Nominations") || "[]"))
    } else {
      setNominations([]);
      localStorage.setItem("Nominations", JSON.stringify([]));
    }
  }, [])

  //Fetch results on change of currentpage for pagination
  useEffect(() => {
    getResult();
  }, [currentPage])

  //Removing nomination
  const removeNomination = (imbdID) => {
    const item = movieResult.filter(p=> p.imdbID == imbdID).map(element => {
      element.nominated = false;
      return element;
    })
    if(showError) {
      setBanner(false);

    }
    setNominations(nominations.filter(item => item.imdbID !== imbdID))

    const localstorageData = JSON.parse(localStorage.getItem("Nominations")).filter(item => item.imdbID !== imbdID);
    localStorage.setItem("Nominations", JSON.stringify(localstorageData));
  }

  //Nomination
  const nominate = (imdbID) => {
    if(nominations.length >= 5) {
      setBanner(true);
    }
    else {
    const item = movieResult.filter(p=> p.imdbID == imdbID).map(element => {
      element.nominated = true;
      return element;
    })
    setNominations((value) => [...value,item[0]]);

    const localstorageData = JSON.parse(localStorage.getItem("Nominations"));
    localstorageData.push(item[0]);
    localStorage.setItem("Nominations", JSON.stringify(localstorageData));
  }
  }

  const getResult = () => {
    console.log(lastPage + '/' + currentPage)
    if(searchTerm){
    const url = `https://www.omdbapi.com/?s=${searchTerm}&page=${currentPage}&type=movie&apikey=65c512f4`;
    setLoading(true);
    axios.get(url).then((response) => {
      setLoading(false);
      let searchData = response.data.Search;
      const lastIndex = Math.floor(response.data.totalResults/10 + 1);
      setLastPage(lastIndex);
      if(localStorage.getItem('Nominations')) {
        const loadedData = JSON.parse(localStorage.getItem('Nominations'));
        for(let data of loadedData) {
          searchData.forEach((element) => {
            if(element.imdbID == data.imdbID) {
              element.nominated = true;
            }
          })
        }
      }
      setMovieResult(searchData);
      setTotalResult(response.data.totalResults);
    })
  }
  }

  return (
    <AppProvider
    i18n={{
      Polaris: {
        ResourceList: {
          defaultItemSingular: 'item',
          defaultItemPlural: 'items',
          showing: `Showing ${currentPage > 1 ? currentPage - 1 + '1' : currentPage} to ${currentPage != lastPage ? currentPage > 1 ? currentPage + '0' : currentPage + '0' : totalResults}   of ${totalResults} {resource}`
        },
      },
    }}
>
  <Page>
    <div style={{marginTop:'10px',marginBottom:'10px'}}>
  <Layout>
  <Layout.Section>
    <Card title="Search for movie title" sectioned>
      <SearchComponent search={(value,page) => {
        setSearchTerm(value);
        setCurrentPage(page);
      }}/>
    </Card>
  </Layout.Section>
</Layout>
</div>
    <div style={{marginTop:'10px',marginBottom:'10px'}}>
      { showError ? (<div style={{marginBottom:'10px'}}>
    <Banner
  title="Already nominated 5 movies"
  status="critical"
  onDismiss={() => { setBanner(false)}}
    >
  </Banner>
    </div>) : (null)}
    
  <Layout>
  <Layout.Section oneHalf>
    <ResultComponent showHeader={true} data={movieResult} nominate={ (item) => nominate(item)} loading={loading}/>
    <Card sectioned>
    <Pagination
  hasPrevious = {currentPage > 1 ? true : false}
  onPrevious={() => {
    let previousPage = currentPage - 1; 
    setCurrentPage(previousPage)
  }}
  hasNext = { lastPage != currentPage ? true : false}
  onNext={() => {
    let nextPage = currentPage + 1; 
    setCurrentPage(nextPage)
  }}
/>
</Card>
  </Layout.Section>
  <Layout.Section oneHalf>
      <NominationComponent data={nominations ? nominations : []} removeNomination = { (item) => removeNomination(item)}/>
  </Layout.Section>
</Layout>
</div>
   
  </Page>
</AppProvider>
  );
}

export default App;
