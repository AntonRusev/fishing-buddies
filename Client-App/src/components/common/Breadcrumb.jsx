import { useLocation, NavLink } from 'react-router-dom';

import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { capitalizeFirstLetter, getPathString } from '../../utils';

const BreadcrumbNav = ({ title = '' }) => {
    const { pathname } = useLocation();

    // Get the name of the Path without the "/"
    const pathString = getPathString(pathname);

    const content = (
        <Breadcrumb aria-label="Solid background breadcrumb example" className="bg-gray-50 px-5 py-3 dark:bg-gray-800">
            <Breadcrumb.Item as={NavLink} icon={HiHome}>
                <NavLink to='/' >
                    Home
                </NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item >
                <NavLink to={`/${pathString}`} >
                    {capitalizeFirstLetter(pathString)}
                </NavLink>
            </Breadcrumb.Item>
            {title
                ? <Breadcrumb.Item>{title}</Breadcrumb.Item>
                : ''
            }
        </Breadcrumb>
    );

    return content;
};

export default BreadcrumbNav;