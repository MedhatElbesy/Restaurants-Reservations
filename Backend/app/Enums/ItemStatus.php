<?php

namespace App\Enums;

abstract class ItemStatus
{
    const Pending   = 'pending';
    const Enabled   = 'enabled';
    const Disabled  = 'disabled';
    const Deleted   = 'deleted';
    const Opened    = 'opened';
    const Closed    = 'closed';
}
