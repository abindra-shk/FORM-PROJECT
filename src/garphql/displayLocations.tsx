import { useQuery, gql } from '@apollo/client';

const GET_LOCATIONS = gql`
  query User($userId: ID!) {
  user(id: $userId) {
    firstName
    lastName
    
  }
}
`;

export function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS,{variables:{userId:1}});

  console.log("data===",data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return( 
      <div>
        {data.user.firstName}
        {data.user.lastName}
      </div>
  );
  
}
