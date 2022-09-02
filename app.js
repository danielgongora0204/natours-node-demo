import expressApp from './middlewares/expressApp';
import tours from './routes/tour';
import users from './routes/user';
import authentication from './routes/authentication';
import unhandledRoutes from './middlewares/unhandledRoutes';

//Making random notes
//Express Configuration
export default expressApp()
  .use('/api/v1/tours', tours)
  .use('/api/v1/users', users)
  .use('/api/v1/auth', authentication)
  .all('*', unhandledRoutes);
