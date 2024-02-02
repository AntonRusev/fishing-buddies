import { useLocation, NavLink } from 'react-router-dom';

import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

const BreadcrumbNav = ({ title = '' }) => {
    const { pathname } = useLocation();

    // Get the string between the first and second "/" in pathname
    const pathString = pathname.split('/')[1];

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