<?php

namespace App\Enums;

abstract class ItemStatus
{
    const Pending   = 'pending';
    const Success   = 'success';
    const Failed   = 'failed';

    const Enabled   = 'enabled';
    const Disabled  = 'disabled';
    const Deleted   = 'deleted';
    const Opened    = 'opened';
    const Closed    = 'closed';

    const Available    = 'available';
    const Unavailable    = 'unavailable';
}
