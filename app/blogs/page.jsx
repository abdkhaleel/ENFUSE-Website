'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link'
export default function BlogPostWithImage() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = 'wpcXDxMtnnJ3rpeYcPdQgVNjb1Z4x3MRrFYT';
      const apiUrl = 'https://enfuseapp.microcms.io/api/v1/blogs/';

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'X-MICROCMS-API-KEY': apiKey,
          },
        });

        setContents(response.data.contents);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [contents]);

  console.log(contents);

  return (
    <Stack  direction={{ base: 'row', md: 'row' }} py={"6"} className='flex flex-row flex-wrap justify-center '>
      {contents.map((content) => (
        <Box 
          key={content.id}
          maxW={'350px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          overflow={'hidden '}
          className='m-5'

        >
          <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
            <Image src={content.eyecatch?.url || '/book.jpg'} fill alt="Example" />
          </Box>
          <Stack>
            {content.category && (
              <Text
                color={'green.500'}
                textTransform={'uppercase'}
                fontWeight={800}
                fontSize={'sm'}
                letterSpacing={1.1}
              >
                {content.category.name}
              </Text>
            )}
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'2xl'}
              fontFamily={'body'}
            >
              {content.title}
            </Heading>
            
          <Button
            mt={10}
            w={'max-content'}
            bg={'green.400'}
            color={'white'}
            rounded={'xl'}
            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
            _hover={{
              bg: 'green.500',
            }}
            _focus={{
              bg: 'green.500',
            }}>
              <Link href={'/blogs/'+content.id}> Know more</Link>
        
          </Button>

        
          </Stack>
          <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
            <Avatar src={content.eyecatch?.url || '/book.jpg'} />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={600}>{content.category?.name}</Text>
              <Text color={'gray.500'}>
                {new Date(content.publishedAt).toLocaleDateString()} · {content.content?.length || 3}min read
              </Text>
            </Stack>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}
